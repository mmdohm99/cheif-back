const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());
app.use(cors());

const recipeRouter = require("./Routes/recipeRouter");
app.use(express.urlencoded({ extended: true }));
app.use("/recipes", recipeRouter);

// this is wildcard API to handle the wrong url
app.get("*", (req, res, next) => {
  const err = new Error("sorry,this is invalid url");
  err.status = "fail";
  err.statusCode = "404";
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    errors: err.errors || [],
  });
});

module.exports = app;
