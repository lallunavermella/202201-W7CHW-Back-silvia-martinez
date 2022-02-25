require("dotenv").config();
const debug = require("debug")("social-network:root");
const chalk = require("chalk");
const upServer = require("./server/upServer");
const app = require("./server/index");

const port = process.env.PORT || 3089;

(async () => {
  try {
    await upServer(port, app);
  } catch (error) {
    debug(chalk.red(`Error:`, error.message));
  }
})();
