import express from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  getCustomerOrders,
  getSellerOrders,
  getCompanyOrders
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Public routes (for customers)
router.route('/').get(getCustomerOrders);
router.route('/').post(createOrder);

// Order management
router.route('/:id').get(getOrder);
router.route('/:id').put(updateOrder);
router.route('/:id').delete(deleteOrder);
router.route('/:id/status').put(updateOrderStatus);

// Admin and moderator routes
router.route('/admin/all').get(authorize(['admin', 'company_moderator']), getOrders);
router.route('/seller/:sellerId').get(authorize(['admin', 'company_moderator']), getSellerOrders);
router.route('/company/:companyId').get(authorize(['admin', 'company_moderator']), getCompanyOrders);

export default router;
