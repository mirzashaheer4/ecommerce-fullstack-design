/**
 * Admin middleware — must be used AFTER protect middleware
 * Checks that the authenticated user has the 'admin' role
 */
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    const err = new Error('Admin access required');
    err.statusCode = 403;
    next(err);
  }
};

export default adminMiddleware;
