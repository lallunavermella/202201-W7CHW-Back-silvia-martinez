require("dotenv").config();
const debug = require("debug")("social-network:root");
const chalk = require("chalk");
const upServer = require("./server/upServer");
const app = require("./server/index");
const connectDatabase = require("./database");

const port = process.env.PORT || 3089;
const connectdB = process.env.MONGO_STRING;

(async () => {
  try {
    await upServer(port, app);
    await connectDatabase(connectdB);
  } catch (error) {
    debug(chalk.red(`Error:`, error.message));
  }
})();
