import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/profile', protect, (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});

export default router;
