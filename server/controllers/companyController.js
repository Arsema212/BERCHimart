import Company from '../models/Company.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
export const getCompanies = asyncHandler(async (req, res) => {
  const { status, businessType, focusArea, search } = req.query;
  
  let query = {};
  
  if (status) query.status = status;
  if (businessType) query.businessType = businessType;
  if (focusArea) query.focusArea = focusArea;
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  const companies = await Company.find(query)
    .populate('moderator', 'name email role')
    .sort({ createdAt: -1 });
    
  res.json({
    success: true,
    count: companies.length,
    data: companies
  });
});

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Public
export const getCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id)
    .populate('moderator', 'name email role profile')
    .populate('approvedBy', 'name email');
    
  if (!company) {
    return res.status(404).json({
      success: false,
      message: 'Company not found'
    });
  }
  
  res.json({
    success: true,
    data: company
  });
});

// @desc    Create new company
// @route   POST /api/companies
// @access  Private
export const createCompany = asyncHandler(async (req, res) => {
  const companyData = {
    ...req.body,
    logo: req.file ? {
      url: req.file.path,
      public_id: req.file.filename
    } : null
  };
  
  const company = await Company.create(companyData);
  
  res.status(201).json({
    success: true,
    data: company
  });
});

// @desc    Update company
// @route   PUT /api/companies/:id
// @access  Private (Admin, Company Moderator)
export const updateCompany = asyncHandler(async (req, res) => {
  let company = await Company.findById(req.params.id);
  
  if (!company) {
    return res.status(404).json({
      success: false,
      message: 'Company not found'
    });
  }
  
  // Check if user is company moderator for this company
  if (req.user.role === 'company_moderator' && req.user.company.toString() !== company._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this company'
    });
  }
  
  const updateData = { ...req.body };
  
  if (req.file) {
    updateData.logo = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }
  
  company = await Company.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });
  
  res.json({
    success: true,
    data: company
  });
});

// @desc    Delete company
// @route   DELETE /api/companies/:id
// @access  Private (Admin only)
export const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  
  if (!company) {
    return res.status(404).json({
      success: false,
      message: 'Company not found'
    });
  }
  
  await company.deleteOne();
  
  res.json({
    success: true,
    message: 'Company deleted successfully'
  });
});

// @desc    Approve company
// @route   PUT /api/companies/:id/approve
// @access  Private (Admin only)
export const approveCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  
  if (!company) {
    return res.status(404).json({
      success: false,
      message: 'Company not found'
    });
  }
  
  // Create moderator account
  const moderatorData = {
    name: req.body.moderatorName || `${company.name} Moderator`,
    email: req.body.moderatorEmail || company.email,
    password: req.body.moderatorPassword || 'tempPassword123',
    role: 'company_moderator',
    company: company._id,
    isCompanyModerator: true,
    status: 'approved'
  };
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  moderatorData.password = await bcrypt.hash(moderatorData.password, salt);
  
  const moderator = await User.create(moderatorData);
  
  // Update company
  company.status = 'approved';
  company.moderator = moderator._id;
  company.approvedBy = req.user._id;
  company.approvedAt = new Date();
  
  await company.save();
  
  res.json({
    success: true,
    data: company,
    moderator: {
      id: moderator._id,
      email: moderator.email,
      password: req.body.moderatorPassword || 'tempPassword123'
    }
  });
});

// @desc    Reject company
// @route   PUT /api/companies/:id/reject
// @access  Private (Admin only)
export const rejectCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  
  if (!company) {
    return res.status(404).json({
      success: false,
      message: 'Company not found'
    });
  }
  
  company.status = 'rejected';
  company.rejectionReason = req.body.reason;
  
  await company.save();
  
  res.json({
    success: true,
    data: company
  });
});

// @desc    Get company statistics
// @route   GET /api/companies/:id/stats
// @access  Private (Admin, Company Moderator)
export const getCompanyStats = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  
  if (!company) {
    return res.status(404).json({
      success: false,
      message: 'Company not found'
    });
  }
  
  // Check authorization
  if (req.user.role === 'company_moderator' && req.user.company.toString() !== company._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this company\'s stats'
    });
  }
  
  const stats = await company.getStats();
  
  // Get additional stats
  const totalOrders = await Order.countDocuments({ company: company._id });
  const totalRevenue = await Order.aggregate([
    { $match: { company: company._id, status: 'delivered' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);
  
  const recentOrders = await Order.find({ company: company._id })
    .populate('customer', 'name email')
    .populate('seller', 'name email')
    .sort({ createdAt: -1 })
    .limit(5);
  
  res.json({
    success: true,
    data: {
      ...stats,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders
    }
  });
});

// @desc    Get company artisans
// @route   GET /api/companies/:id/artisans
// @access  Private (Admin, Company Moderator)
export const getCompanyArtisans = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  
  if (!company) {
    return res.status(404).json({
      success: false,
      message: 'Company not found'
    });
  }
  
  // Check authorization
  if (req.user.role === 'company_moderator' && req.user.company.toString() !== company._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this company\'s artisans'
    });
  }
  
  const artisans = await User.find({ 
    company: company._id, 
    role: 'seller' 
  }).select('-password');
  
  res.json({
    success: true,
    count: artisans.length,
    data: artisans
  });
});

// @desc    Get company products
// @route   GET /api/companies/:id/products
// @access  Private (Admin, Company Moderator)
export const getCompanyProducts = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  
  if (!company) {
    return res.status(404).json({
      success: false,
      message: 'Company not found'
    });
  }
  
  // Check authorization
  if (req.user.role === 'company_moderator' && req.user.company.toString() !== company._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this company\'s products'
    });
  }
  
  const { status, category, search } = req.query;
  
  let query = { company: company._id };
  
  if (status) query.status = status;
  if (category) query.category = category;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  const products = await Product.find(query)
    .populate('artisan', 'name email profile')
    .sort({ createdAt: -1 });
  
  res.json({
    success: true,
    count: products.length,
    data: products
  });
});
