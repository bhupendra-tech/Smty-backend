const mongoose = require("mongoose");

const { StatusCodes } = require("http-status-codes");
const SubjectList = require("../models/subjectList");
const ChapterList = require("../models/chapterList");
const TopicList = require("../models/topicList");
const { BadRequestError, NotFoundError } = require("../errors");
// Controller to add a new subject

async function addSubject(req, res) {
  const { userId, subjectName } = req.body;
  if ((!userId, !subjectName))
    throw new BadRequestError("Invalid UserId or SubjectName");
  const subjectListObj = await SubjectList.findOneAndUpdate(
    { userId },
    {
      $setOnInsert: { userId },
      $push: { subjectList: { subjectName } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  res.status(StatusCodes.CREATED).json({
    error: {
      error: false,
      errorMsg: "",
    },
    subjectList: {
      userId: subjectListObj.userId,
      subjectList: subjectListObj.subjectList.map((obj) => {
        const { subjectName, _id } = obj;
        return { subjectName, subjectId: _id };
      }),
    },
  });
}
async function getSubjects(req, res) {
  const { userId } = req.body;
  if (!userId) throw new BadRequestError("Invalid UserId");
  const subjectListObj = await SubjectList.findOne({ userId });
  if (!subjectListObj) {
    throw new Error("Subjects Not found");
  }
  res.status(StatusCodes.OK).json({
    error: {
      error: false,
      errorMsg: "",
    },
    subjectList: {
      userId: subjectListObj.userId,
      subjectList: subjectListObj.subjectList.map((obj) => {
        const { subjectName, _id } = obj;
        return { subjectName, subjectId: _id };
      }),
    },
  });
}

async function addChapter(req, res) {
  const { subjectId, chapterName } = req.body;
  if ((!subjectId, !chapterName))
    throw new BadRequestError("Invalid SubjectId or ChapterName");
  const chapterListObj = await ChapterList.findOneAndUpdate(
    { subjectId: subjectId },
    {
      $setOnInsert: { subjectId },
      $push: { chapterList: { chapterName } },
    },
    { new: true, upsert: true }
  );
  res.status(StatusCodes.CREATED).json({
    error: {
      error: false,
      errorMsg: "",
    },
    chapterList: {
      userId: chapterListObj.userId,
      chapterList: chapterListObj.chapterList.map((obj) => {
        const { chapterName, _id } = obj;
        return { chapterName, chapterId: _id };
      }),
    },
  });
}
async function getChapters(req, res) {
  const { subjectId } = req.body;
  if (!subjectId) throw new BadRequestError("Invalid SubjectId");
  const chapterListObj = await ChapterList.findOne({ subjectId });
  if (!chapterListObj) {
    throw new NotFoundError("Chapters Not found");
  }
  res.status(StatusCodes.OK).json({
    error: {
      error: false,
      errorMsg: "",
    },
    chapterList: {
      userId: chapterListObj.userId,
      chapterList: chapterListObj.chapterList.map((obj) => {
        const { chapterName, _id } = obj;
        return { chapterName, chapterId: _id };
      }),
    },
  });
}

// Controller to add a new topic to an existing chapter within a subject
async function addTopic(req, res) {
  const { chapterId, topicName, userEditorDocId } = req.body;
  if ((!chapterId, !topicName, !userEditorDocId))
    throw new BadRequestError(
      "Invalid ChapterId or topicName or UserEditorDocId"
    );
  const topicListObj = await TopicList.findOneAndUpdate(
    { chapterId },
    {
      $setOnInsert: { chapterId },
      $push: { topicList: { userEditorDocId, topicName } },
    },
    { upsert: true, new: true }
  );

  res.status(StatusCodes.CREATED).json({
    error: {
      error: false,
      errorMsg: "",
    },
    topicList: {
      chapterId: topicListObj.chapterId,
      topicList: topicListObj.topicList.map((obj) => {
        const { topicName, _id, userEditorDocId } = obj;
        return { topicName, topicId: _id, userEditorDocId };
      }),
    },
  });
}
async function getTopics(req, res) {
  const { chapterId } = req.body;
  if (!chapterId) throw new BadRequestError("Invalid ChapterId");
  const topicListObj = await TopicList.findOne({ chapterId });
  if (!topicListObj) {
    throw new NotFoundError("Topics Not found");
  }
  res.status(StatusCodes.OK).json({
    error: {
      error: false,
      errorMsg: "",
    },
    topicList: {
      chapterId: topicListObj.chapterId,
      topicList: topicListObj.topicList.map((obj) => {
        const { topicName, _id, userEditorDocId } = obj;
        return { topicName, topicId: _id, userEditorDocId };
      }),
    },
  });
}

module.exports = {
  addSubject,
  addChapter,
  addTopic,
  getSubjects,
  getChapters,
  getTopics,
};
