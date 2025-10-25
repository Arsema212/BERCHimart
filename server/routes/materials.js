import express from 'express';
import {
  getMaterialSuppliers,
  getMaterialSupplier,
  createMaterialSupplier,
  updateMaterialSupplier,
  deleteMaterialSupplier,
  approveMaterialSupplier,
  rejectMaterialSupplier,
  getMaterialsByCategory,
  searchMaterials
} from '../controllers/materialController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.route('/').get(getMaterialSuppliers);
router.route('/search').get(searchMaterials);
router.route('/category/:category').get(getMaterialsByCategory);

// Protected routes
router.route('/').post(protect, upload.single('logo'), createMaterialSupplier);
router.route('/:id').get(getMaterialSupplier);
router.route('/:id').put(protect, authorize(['admin', 'company_moderator']), upload.single('logo'), updateMaterialSupplier);
router.route('/:id').delete(protect, authorize(['admin']), deleteMaterialSupplier);

// Admin only routes
router.route('/:id/approve').put(protect, authorize(['admin']), approveMaterialSupplier);
router.route('/:id/reject').put(protect, authorize(['admin']), rejectMaterialSupplier);

export default router;
