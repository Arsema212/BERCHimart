import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Company from '../models/Company.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all orders (Admin/Moderator)
// @route   GET /api/orders/admin/all
// @access  Private (Admin, Company Moderator)
export const getOrders = asyncHandler(async (req, res) => {
  const { status, company, seller, dateFrom, dateTo } = req.query;
  
  let query = {};
  
  if (status) query.status = status;
  if (company) query.company = company;
  if (seller) query.seller = seller;
  
  if (dateFrom || dateTo) {
    query.createdAt = {};
    if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
    if (dateTo) query.createdAt.$lte = new Date(dateTo);
  }
  
  // If user is company moderator, only show orders from their company
  if (req.user.role === 'company_moderator') {
    query.company = req.user.company;
  }
  
  const orders = await Order.find(query)
    .populate('customer', 'name email')
    .populate('seller', 'name email')
    .populate('company', 'name')
    .populate('items.product', 'name price images')
    .sort({ createdAt: -1 });
    
  res.json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('customer', 'name email phone')
    .populate('seller', 'name email phone')
    .populate('company', 'name email phone')
    .populate('items.product', 'name price images description');
    
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
  
  // Check authorization
  if (req.user.role === 'user' && order.customer._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this order'
    });
  }
  
  if (req.user.role === 'seller' && order.seller._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this order'
    });
  }
  
  if (req.user.role === 'company_moderator' && order.company._id.toString() !== req.user.company.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this order'
    });
  }
  
  res.json({
    success: true,
    data: order
  });
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Customer)
export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, billingAddress, paymentMethod } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Order must contain at least one item'
    });
  }
  
  // Validate products and calculate totals
  let totalAmount = 0;
  const orderItems = [];
  
  for (const item of items) {
    const product = await Product.findById(item.product);
    
    if (!product) {
      return res.status(400).json({
        success: false,
        message: `Product ${item.product} not found`
      });
    }
    
    if (!product.isActive || product.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: `Product ${product.name} is not available`
      });
    }
    
    if (product.stock < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for ${product.name}`
      });
    }
    
    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;
    
    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price,
      total: itemTotal
    });
  }
  
  // Get seller and company from first product
  const firstProduct = await Product.findById(items[0].product).populate('artisan company');
  
  const orderData = {
    customer: req.user._id,
    seller: firstProduct.artisan._id,
    company: firstProduct.company._id,
    items: orderItems,
    shippingAddress,
    billingAddress,
    payment: {
      method: paymentMethod,
      amount: totalAmount
    },
    totalAmount
  };
  
  const order = await Order.create(orderData);
  
  // Update product stock
  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity }
    });
  }
  
  // Update seller stats
  await User.findByIdAndUpdate(firstProduct.artisan._id, {
    $inc: { 
      'stats.totalOrders': 1,
      'earnings.total': totalAmount,
      'earnings.pending': totalAmount
    }
  });
  
  // Update company stats
  await Company.findByIdAndUpdate(firstProduct.company._id, {
    $inc: { 
      'stats.totalOrders': 1,
      'stats.totalSales': totalAmount
    }
  });
  
  const populatedOrder = await Order.findById(order._id)
    .populate('customer', 'name email')
    .populate('seller', 'name email')
    .populate('company', 'name')
    .populate('items.product', 'name price images');
  
  res.status(201).json({
    success: true,
    data: populatedOrder
  });
});

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private
export const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
  
  // Check authorization
  if (req.user.role === 'user' && order.customer.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this order'
    });
  }
  
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .populate('customer', 'name email')
    .populate('seller', 'name email')
    .populate('company', 'name')
    .populate('items.product', 'name price images');
  
  res.json({
    success: true,
    data: updatedOrder
  });
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private (Admin, Customer)
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
  
  // Check authorization
  if (req.user.role === 'user' && order.customer.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this order'
    });
  }
  
  // Only allow deletion if order is pending
  if (order.status !== 'pending') {
    return res.status(400).json({
      success: false,
      message: 'Only pending orders can be deleted'
    });
  }
  
  // Restore product stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: item.quantity }
    });
  }
  
  await order.deleteOne();
  
  res.json({
    success: true,
    message: 'Order deleted successfully'
  });
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin, Company Moderator, Seller)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, tracking } = req.body;
  
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }
  
  // Check authorization
  if (req.user.role === 'seller' && order.seller.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this order'
    });
  }
  
  if (req.user.role === 'company_moderator' && order.company.toString() !== req.user.company.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this order'
    });
  }
  
  const updateData = { status };
  
  if (tracking) {
    updateData.tracking = tracking;
  }
  
  // If order is delivered, update earnings
  if (status === 'delivered' && order.status !== 'delivered') {
    const seller = await User.findById(order.seller);
    const commission = order.totalAmount * 0.1; // 10% commission
    const sellerEarnings = order.totalAmount - commission;
    
    await User.findByIdAndUpdate(order.seller, {
      $inc: { 
        'earnings.pending': -order.totalAmount,
        'earnings.paid': sellerEarnings
      }
    });
    
    updateData.commission = {
      amount: commission,
      rate: 10
    };
  }
  
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  })
    .populate('customer', 'name email')
    .populate('seller', 'name email')
    .populate('company', 'name')
    .populate('items.product', 'name price images');
  
  res.json({
    success: true,
    data: updatedOrder
  });
});

// @desc    Get customer orders
// @route   GET /api/orders
// @access  Private (Customer)
export const getCustomerOrders = asyncHandler(async (req, res) => {
  const { status } = req.query;
  
  let query = { customer: req.user._id };
  if (status) query.status = status;
  
  const orders = await Order.find(query)
    .populate('seller', 'name email')
    .populate('company', 'name')
    .populate('items.product', 'name price images')
    .sort({ createdAt: -1 });
    
  res.json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Get seller orders
// @route   GET /api/orders/seller/:sellerId
// @access  Private (Admin, Company Moderator)
export const getSellerOrders = asyncHandler(async (req, res) => {
  const { sellerId } = req.params;
  const { status } = req.query;
  
  let query = { seller: sellerId };
  if (status) query.status = status;
  
  const orders = await Order.find(query)
    .populate('customer', 'name email')
    .populate('company', 'name')
    .populate('items.product', 'name price images')
    .sort({ createdAt: -1 });
    
  res.json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Get company orders
// @route   GET /api/orders/company/:companyId
// @access  Private (Admin, Company Moderator)
export const getCompanyOrders = asyncHandler(async (req, res) => {
  const { companyId } = req.params;
  const { status } = req.query;
  
  let query = { company: companyId };
  if (status) query.status = status;
  
  const orders = await Order.find(query)
    .populate('customer', 'name email')
    .populate('seller', 'name email')
    .populate('items.product', 'name price images')
    .sort({ createdAt: -1 });
    
  res.json({
    success: true,
    count: orders.length,
    data: orders
  });
});
