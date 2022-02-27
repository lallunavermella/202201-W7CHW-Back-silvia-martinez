const bcrypt = require("bcrypt");
const debug = require("debug")("social-network:controller:");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");

/* const path = require("path");
const fs = require("fs"); */
const User = require("../../database/models/User");

const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("friend").populate("enemie");
    res.status(200).json({ users });
  } catch (error) {
    debug(chalk.italic.bold.bgRed.green("Error"));
    error.status = 400;
    next(error);
  }
};

const userRegister = async (req, res, next) => {
  const user = req.body;

  try {
    const userName = await User.findOne({ username: user.userName });

    if (!userName) {
      debug(chalk.italic.bold.bgRed.green("username taken"));
      res.status(400).json({ error: "username taken" });
    }
    if (!user.password) {
      debug(chalk.italic.bold.bgRed.green("password required"));
      res.status(400).json({ error: "password required" });
      return;
    }
    const password = await bcrypt.hash(user.password, 10);

    await User.create({ ...user, password });
    /* const oldName = path.join("uploads", req.file.filename);
    const newName = path.join("uploads", req.file.originalname);
    fs.rename(oldName, newName, async () => {
      await User.findByIdAndUpdate(user.id, { image: req.file.originalname });
    }); */

    debug(chalk.bold.bgBlue.magenta(`Created new user: ${user.userName}`));
    res.status(201).json({ name: user.name, userName: user.userName });
  } catch (error) {
    debug(chalk.italic.bold.bgRed.green(`failed to create user:${error}`));
    error.message = `failed to create user:${error}`;
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });

  if (!user) {
    const error = new Error("Incorrect password or username");
    error.status = 401;
    next(error);
    return;
  }

  const isRightPassword = await bcrypt.compare(password, user.password);

  if (!isRightPassword) {
    const error = new Error("Incorrect password or username");
    error.status = 401;
    next(error);
    return;
  }

  const userData = {
    name: user.name,
    id: user.id,
  };
  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
};

module.exports = { userRegister, listUsers, userLogin };
