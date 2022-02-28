require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("./routers/userRouters");
const { errorNotFound, generalError } = require("./middlewares/errors");

const app = express();

app.use(express.static("uploads"));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(express.json());

app.use("/", userRouter);

app.use(errorNotFound);
app.use(generalError);

module.exports = app;
