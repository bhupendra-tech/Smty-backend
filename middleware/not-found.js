const { StatusCodes } = require("http-status-codes");
const notFoundMiddleware = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).json({
    error: {
      error: true,
      errorMsg: "Route Does not exist",
    },
  });
module.exports = notFoundMiddleware;
