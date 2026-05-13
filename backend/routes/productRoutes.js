import express from 'express';
import {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// IMPORTANT: /featured must be registered BEFORE /:id
router.get('/featured', getFeaturedProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/:id/related', getRelatedProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
