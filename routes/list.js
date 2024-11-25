const express = require("express");
const router = express.Router();
const {
  addSubject,
  addChapter,
  addTopic,
  getSubjects,
  getChapters,
  getTopics,
} = require("../controllers/list");

router.post("/addSubject", addSubject);
router.post("/getSubjects", getSubjects);
router.post("/addChapter", addChapter);
router.post("/getChapters", getChapters);
router.post("/addTopic", addTopic);
router.post("/getTopics", getTopics);
module.exports = router;
