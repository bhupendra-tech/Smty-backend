const { NotFoundError, BadRequestError } = require("../errors");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({
    error: {
      error: false,
      errorMsg: "",
    },
    user: {
      name: user.name,
      email: user.email,
      userId: user._id,
    },
  });
};

const getUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Email not valid");
  }
  const user = await User.findOne({ ...req.body });
  if (!user) {
    throw new NotFoundError("Email not found");
  }
  res.status(StatusCodes.OK).json({
    error: {
      error: false,
      errorMsg: "",
    },
    user: {
      name: user.name,
      email: user.email,
      userId: user._id,
    },
  });
};

module.exports = {
  createUser,
  getUser,
};
