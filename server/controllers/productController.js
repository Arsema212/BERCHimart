// server/controllers/productController.js
import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all products with filters and search
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const {
    category,
    search,
    minPrice,
    maxPrice,
    page = 1,
    limit = 12,
    sort = 'createdAt'
  } = req.query;

  let query = { isActive: true };

  // Filter by category
  if (category && category !== 'all') {
    query.category = category;
  }

  // Search in name, description, and tags
  if (search) {
    query.$text = { $search: search };
  }

  // Price range filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Sort options
  const sortOptions = {
    newest: { createdAt: -1 },
    priceLow: { price: 1 },
    priceHigh: { price: -1 },
    name: { name: 1 }
  };

  const sortBy = sortOptions[sort] || sortOptions.newest;

  const products = await Product.find(query)
    .populate('artisan', 'name profile.avatar profile.bio')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort(sortBy);

  const total = await Product.countDocuments(query);

  res.json({
    success: true,
    count: products.length,
    products,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
    total
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('artisan', 'name profile.bio profile.skills profile.disabilities profile.avatar');

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({
    success: true,
    product
  });
});

// @desc    Create product
// @route   POST /api/products
// @access  Private/Artisan
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    stock,
    tags,
    materials,
    dimensions,
    accessibility
  } = req.body;

  // Basic validation
  if (!name || !description || !price || !category) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const product = await Product.create({
    name,
    description,
    price: Number(price),
    category,
    stock: stock ? Number(stock) : 1,
    tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    materials: materials ? materials.split(',').map(mat => mat.trim()) : [],
    dimensions: dimensions ? JSON.parse(dimensions) : {},
    accessibility: accessibility ? JSON.parse(accessibility) : {},
    artisan: req.user._id,
    images: req.files ? req.files.map(file => ({
      url: file.path,
      alt: `${name} - Handmade product`,
      public_id: file.filename
    })) : []
  });

  const populatedProduct = await Product.findById(product._id)
    .populate('artisan', 'name profile.avatar');

  res.status(201).json({
    success: true,
    product: populatedProduct
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Artisan
export const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if user owns the product or is admin
  if (product.artisan.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to update this product');
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('artisan', 'name profile.avatar');

  res.json({
    success: true,
    product
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Artisan
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if user owns the product or is admin
  if (product.artisan.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this product');
  }

  await Product.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});