import express from 'express';
import {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  approveCompany,
  rejectCompany,
  getCompanyStats,
  getCompanyArtisans,
  getCompanyProducts
} from '../controllers/companyController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.route('/').get(getCompanies);

// Protected routes
router.route('/').post(protect, upload.single('logo'), createCompany);
router.route('/:id').get(getCompany);
router.route('/:id').put(protect, authorize(['admin', 'company_moderator']), upload.single('logo'), updateCompany);
router.route('/:id').delete(protect, authorize(['admin']), deleteCompany);

// Admin only routes
router.route('/:id/approve').put(protect, authorize(['admin']), approveCompany);
router.route('/:id/reject').put(protect, authorize(['admin']), rejectCompany);
router.route('/:id/stats').get(protect, authorize(['admin', 'company_moderator']), getCompanyStats);
router.route('/:id/artisans').get(protect, authorize(['admin', 'company_moderator']), getCompanyArtisans);
router.route('/:id/products').get(protect, authorize(['admin', 'company_moderator']), getCompanyProducts);

export default router;
