const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;
