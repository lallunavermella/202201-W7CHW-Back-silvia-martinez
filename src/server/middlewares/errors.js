const chalk = require("chalk");
const debug = require("debug")("social-network:error:");

const errorNotFound = (req, res) => {
  debug(chalk.bold.bgGrey.red("error: Not found"));
  res.status(404);
  res.json({ error: true, message: "Not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  debug(chalk.bold.bgGrey.red(`${err.message}`));
  const status = err.status ?? 500;
  const message = err.message ?? "server error";
  res.status(status).json({ error: message });
};

module.exports = { errorNotFound, generalError };
