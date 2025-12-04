class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode || 400;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;