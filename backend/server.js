import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// HTTP request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/search', searchRoutes);

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
