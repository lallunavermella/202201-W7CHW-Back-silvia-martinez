require("dotenv").config();
const debug = require("debug")("social-network:server");
const chalk = require("chalk");

const upServer = (port, app) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(
        chalk.italic.bgRed.black(
          `Server listening on http://localhost:${port}/`
        )
      );
      resolve();
    });

    server.on("error", (error) => {
      reject(error);
    });
  });

module.exports = upServer;
