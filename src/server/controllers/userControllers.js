const bcrypt = require("bcrypt");
const debug = require("debug")("social-network:controller:");
const chalk = require("chalk");
const User = require("../../database/models/User");

const userRegister = async (req, res, next) => {
  const user = req.body;
  try {
    const userName = await User.findOne({ username: user.userName });
    if (!userName) {
      debug(chalk.italic.bold.bgRed.green("username taken"));
      res.status(400).json({ error: "username taken" });
      return;
    }
    if (!user.password) {
      debug(chalk.italic.bold.bgRed.green("password required"));
      res.status(400).json({ error: "password required" });
      return;
    }
    const password = await bcrypt.hash(user.password, 10);
    await User.create({ ...user, password });
    debug(chalk.bold.bgBlue.magenta(`Created new user: ${user.userName}`));
    res.status(201).json({ name: user.name, userName: user.userName });
  } catch (error) {
    debug(chalk.italic.bold.bgRed.green("failed to create user"));
    error.message = "failed to create user";
    next(error);
  }
};

module.exports = userRegister;
