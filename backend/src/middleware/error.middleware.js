const CustomError = require('./errors/customError');

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, _req, res, _next) => {
  const { status, message } = err;
  if (err instanceof CustomError) {
    return res.status(status).json({ message });
  }

  return res.status(500).json({ message });
};

module.exports = errorMiddleware;
