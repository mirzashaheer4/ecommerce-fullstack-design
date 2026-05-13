import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Protect middleware — verifies JWT and attaches user to req
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Read token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      const err = new Error('Not authorized, no token');
      err.statusCode = 401;
      throw err;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and attach to request (exclude password)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      const err = new Error('Not authorized, user not found');
      err.statusCode = 401;
      throw err;
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      const err = new Error('Not authorized, token invalid or expired');
      err.statusCode = 401;
      return next(err);
    }
    next(error);
  }
};

export default protect;
