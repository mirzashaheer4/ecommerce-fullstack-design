import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  createPaymentIntent,
  confirmOrder,
  getMyOrders,
  getOrderById
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-intent', createPaymentIntent);
router.post('/confirm', confirmOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/orders/:id', protect, getOrderById);

export default router;
