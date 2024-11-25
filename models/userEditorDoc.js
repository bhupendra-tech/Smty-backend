const mongoose = require("mongoose");

const userEditorDocSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("userEditorDoc", userEditorDocSchema);
