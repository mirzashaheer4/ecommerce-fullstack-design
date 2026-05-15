import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// CORS — allow local dev and production frontend
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// HTTP request logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handler (must be last)
app.use(errorHandler);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
