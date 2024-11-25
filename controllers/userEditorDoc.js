const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const UserEditorDoc = require("../models/userEditorDoc");

const createDoc = async (req, res) => {
  const { userId, data } = req.body;
  const userEditorDoc = await UserEditorDoc.create({ userId, data });
  res.status(StatusCodes.CREATED).json({
    error: {
      error: false,
      errorMsg: "",
    },
    userEditorDoc: {
      userEditorDocId: userEditorDoc._id,
      userEditorDocData: userEditorDoc.data,
    },
  });
};
const getDoc = async (req, res) => {
  const { userEditorDocId } = req.body;
  if (!userEditorDocId) {
    throw new BadRequestError("Doc Id not valid");
  }
  const userEditorDoc = await UserEditorDoc.findById({ _id: userEditorDocId });
  if (!userEditorDoc) {
    throw new NotFoundError("Doc not found");
  }
  res.status(StatusCodes.OK).json({
    error: {
      error: false,
      errorMsg: "",
    },
    userEditorDoc: {
      userEditorDocId: userEditorDoc._id,
      userEditorDocData: userEditorDoc.data,
    },
  });
};
const updateDoc = async (req, res) => {
  const { userEditorDocId, data } = req.body;
  if (!userEditorDocId) {
    throw new BadRequestError("Doc Id not valid");
  }
  const _id = userEditorDocId;
  const userEditorDoc = await UserEditorDoc.findByIdAndUpdate(_id, {
    data,
  });
  if (!userEditorDoc) {
    throw new NotFoundError("Doc not found");
  }
  res.status(StatusCodes.OK).json({
    error: {
      error: false,
      errorMsg: "",
    },
    userEditorDoc: {
      userEditorDocId: userEditorDoc._id,
      userEditorDocData: userEditorDoc.data,
    },
  });
};

module.exports = {
  createDoc,
  getDoc,
  updateDoc,
};
