import express from 'express';
import protect from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { getDashboardStats, getAllUsers } from '../controllers/adminController.js';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// All admin routes require protect + admin
router.use(protect);
router.use(adminMiddleware);

router.get('/stats', getDashboardStats);
router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/users', getAllUsers);

export default router;
