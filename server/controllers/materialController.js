import MaterialSupplier from '../models/MaterialSupplier.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all material suppliers
// @route   GET /api/materials
// @access  Public
export const getMaterialSuppliers = asyncHandler(async (req, res) => {
  const { status, category, search } = req.query;
  
  let query = {};
  
  if (status) query.status = status;
  if (category) query['materials.category'] = category;
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { 'materials.name': { $regex: search, $options: 'i' } }
    ];
  }
  
  const suppliers = await MaterialSupplier.find(query)
    .populate('approvedBy', 'name email')
    .sort({ createdAt: -1 });
    
  res.json({
    success: true,
    count: suppliers.length,
    data: suppliers
  });
});

// @desc    Get single material supplier
// @route   GET /api/materials/:id
// @access  Public
export const getMaterialSupplier = asyncHandler(async (req, res) => {
  const supplier = await MaterialSupplier.findById(req.params.id)
    .populate('approvedBy', 'name email');
    
  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: 'Material supplier not found'
    });
  }
  
  res.json({
    success: true,
    data: supplier
  });
});

// @desc    Create new material supplier
// @route   POST /api/materials
// @access  Private
export const createMaterialSupplier = asyncHandler(async (req, res) => {
  const supplierData = {
    ...req.body,
    logo: req.file ? {
      url: req.file.path,
      public_id: req.file.filename
    } : null
  };
  
  const supplier = await MaterialSupplier.create(supplierData);
  
  res.status(201).json({
    success: true,
    data: supplier
  });
});

// @desc    Update material supplier
// @route   PUT /api/materials/:id
// @access  Private (Admin, Company Moderator)
export const updateMaterialSupplier = asyncHandler(async (req, res) => {
  let supplier = await MaterialSupplier.findById(req.params.id);
  
  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: 'Material supplier not found'
    });
  }
  
  const updateData = { ...req.body };
  
  if (req.file) {
    updateData.logo = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }
  
  supplier = await MaterialSupplier.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });
  
  res.json({
    success: true,
    data: supplier
  });
});

// @desc    Delete material supplier
// @route   DELETE /api/materials/:id
// @access  Private (Admin only)
export const deleteMaterialSupplier = asyncHandler(async (req, res) => {
  const supplier = await MaterialSupplier.findById(req.params.id);
  
  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: 'Material supplier not found'
    });
  }
  
  await supplier.deleteOne();
  
  res.json({
    success: true,
    message: 'Material supplier deleted successfully'
  });
});

// @desc    Approve material supplier
// @route   PUT /api/materials/:id/approve
// @access  Private (Admin only)
export const approveMaterialSupplier = asyncHandler(async (req, res) => {
  const supplier = await MaterialSupplier.findById(req.params.id);
  
  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: 'Material supplier not found'
    });
  }
  
  supplier.status = 'approved';
  supplier.approvedBy = req.user._id;
  supplier.approvedAt = new Date();
  
  await supplier.save();
  
  res.json({
    success: true,
    data: supplier
  });
});

// @desc    Reject material supplier
// @route   PUT /api/materials/:id/reject
// @access  Private (Admin only)
export const rejectMaterialSupplier = asyncHandler(async (req, res) => {
  const supplier = await MaterialSupplier.findById(req.params.id);
  
  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: 'Material supplier not found'
    });
  }
  
  supplier.status = 'rejected';
  supplier.rejectionReason = req.body.reason;
  
  await supplier.save();
  
  res.json({
    success: true,
    data: supplier
  });
});

// @desc    Get materials by category
// @route   GET /api/materials/category/:category
// @access  Public
export const getMaterialsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { supplier } = req.query;
  
  let query = { 
    status: 'approved',
    'materials.category': category,
    'materials.isAvailable': true
  };
  
  if (supplier) {
    query._id = supplier;
  }
  
  const suppliers = await MaterialSupplier.find(query)
    .select('name description materials delivery rating')
    .sort({ 'rating.average': -1 });
  
  // Filter materials by category
  const filteredSuppliers = suppliers.map(supplier => ({
    ...supplier.toObject(),
    materials: supplier.materials.filter(material => 
      material.category === category && material.isAvailable
    )
  }));
  
  res.json({
    success: true,
    count: filteredSuppliers.length,
    data: filteredSuppliers
  });
});

// @desc    Search materials
// @route   GET /api/materials/search
// @access  Public
export const searchMaterials = asyncHandler(async (req, res) => {
  const { q, category, minPrice, maxPrice, supplier } = req.query;
  
  let query = { 
    status: 'approved',
    'materials.isAvailable': true
  };
  
  if (supplier) {
    query._id = supplier;
  }
  
  if (category) {
    query['materials.category'] = category;
  }
  
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: 'i' } },
      { 'materials.name': { $regex: q, $options: 'i' } },
      { 'materials.description': { $regex: q, $options: 'i' } }
    ];
  }
  
  const suppliers = await MaterialSupplier.find(query)
    .select('name description materials delivery rating')
    .sort({ 'rating.average': -1 });
  
  // Filter and sort materials
  let allMaterials = [];
  suppliers.forEach(supplier => {
    supplier.materials.forEach(material => {
      if (material.isAvailable) {
        if (!category || material.category === category) {
          if (!minPrice || material.price >= parseFloat(minPrice)) {
            if (!maxPrice || material.price <= parseFloat(maxPrice)) {
              allMaterials.push({
                ...material.toObject(),
                supplier: {
                  id: supplier._id,
                  name: supplier.name,
                  delivery: supplier.delivery,
                  rating: supplier.rating
                }
              });
            }
          }
        }
      }
    });
  });
  
  // Sort by price if specified
  if (req.query.sort === 'price_low') {
    allMaterials.sort((a, b) => a.price - b.price);
  } else if (req.query.sort === 'price_high') {
    allMaterials.sort((a, b) => b.price - a.price);
  } else {
    allMaterials.sort((a, b) => b.supplier.rating.average - a.supplier.rating.average);
  }
  
  res.json({
    success: true,
    count: allMaterials.length,
    data: allMaterials
  });
});
