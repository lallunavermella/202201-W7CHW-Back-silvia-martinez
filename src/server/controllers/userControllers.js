const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

const userRegister = async (req, res, next) => {
  const user = req.body;
  try {
    const userName = await User.findOne({ username: user.username });
    if (userName) {
      res.status(409).json({ error: "username taken" });
    }
    const password = await bcrypt.hash(user.password, 10);
    const newUser = await User.create({ ...user, password });
    res.status(201).json(newUser);
  } catch (error) {
    error.message = "failed to create user";
    next(error);
  }
};

module.exports = userRegister;
