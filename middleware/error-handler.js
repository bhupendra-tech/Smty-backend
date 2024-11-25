const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/customErrors");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCodes: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong",
  };
  if (err.code && err.code === 11000) {
    customError.msg = `This ${Object.keys(err.keyValue)} already exists, `;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (customError.msg.length > 100) customError.msg = "Something went wrong";
  return res.status(customError.statusCodes).json({
    error: {
      error: true,
      errorMsg: customError.msg,
    },
  });
};

module.exports = errorHandlerMiddleware;
