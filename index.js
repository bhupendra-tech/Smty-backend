require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connection");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

// routers
const userRouter = require("./routes/user");
const listRouter = require("./routes/list");
const userEditorDoc = require("./routes/userEditorDoc");

app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/list", listRouter);
app.use("/api/v1/editorDocs", userEditorDoc);

app.post("/api/v1", (req, res) => {
  res.send("Hello world");
});
app.get("/api/v1", (req, res) => {
  res.send("Hello world get");
});
//error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
