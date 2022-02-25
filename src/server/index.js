require("dotenv").config();
const express = require("express");
const { errorNotFound, generalError } = require("./middlewares/errors");

const app = express();

app.use(errorNotFound);
app.use(generalError);

module.exports = app;
