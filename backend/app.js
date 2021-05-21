const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
//import mongoose
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const productRouter = require("./routes/product");

const app = express();
//connection to remote mongo server
mongoose.connect(
  process.env.MONGO_SERVER_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  function (err) {
    if (err) {
      console.log("some error in mongodb connection occured", err);
    } else {
      console.log("connection to database successfully");
    }
  }
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/", indexRouter);
app.use("/products", productRouter);

module.exports = app;
