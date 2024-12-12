const express = require("express");
require("express-async-errors");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

function logErrors(err, req, res, next) {
  console.log("logErrors");
  console.error(err.stack);
  next(err);
}
function errorHandler(err, req, res, next) {
  console.log("errorHandler");
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
}
// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors()); // tránh truy cập từ các domain khác
// app.use(logErrors);
// app.use(errorHandler);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

routes(app);

app.get("/", (req, res) => {
  throw new Error("BROKEN"); // Express will catch this on its own.
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
