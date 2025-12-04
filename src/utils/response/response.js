const successResponse = (res, data = null, message = 'success', status = 200) => {
  return res.status(status).json({
    success: true,
    message: message,
    data: data,
  });
};

const errorResponse = (res, error, message = 'error', status = 500) => {
  return res.status(status).json({
    success: false,
    message: message,
    error: error,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
