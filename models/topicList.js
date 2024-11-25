const mongoose = require("mongoose");

const topicListSchema = new mongoose.Schema({
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChapterList",
    required: true,
  },
  topicList: [
    {
      userEditorDocId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserEditorDoc",
        required: true,
      },
      topicName: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("topicList", topicListSchema);
