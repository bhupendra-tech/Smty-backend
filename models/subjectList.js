const mongoose = require("mongoose");

const subjectListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subjectList: [
    {
      subjectName: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("SubjectList", subjectListSchema);
