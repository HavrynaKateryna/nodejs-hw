import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // если ошибка создана через createHttpError
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
};
