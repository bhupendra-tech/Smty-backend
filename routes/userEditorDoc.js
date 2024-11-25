const express = require("express");
const router = express.Router();

const {
  createDoc,
  getDoc,
  updateDoc,
} = require("../controllers/userEditorDoc");

router.post("/addDoc", createDoc);
router.post("/getDoc", getDoc);
router.post("/updateDoc", updateDoc);

module.exports = router;
