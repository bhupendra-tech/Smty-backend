const mongoose = require("mongoose");

const chapterListSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubjectList",
    required: true,
  },
  chapterList: [
    {
      chapterName: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("ChapterList", chapterListSchema);
