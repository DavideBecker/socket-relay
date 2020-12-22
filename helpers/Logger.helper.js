var chalk = require("chalk");

class Logger {
  static connected({ socket }) {
    console.log(
      chalk.green("client"),
      chalk.yellow(socket.id),
      chalk.green("connected to"),
      chalk.cyan(socket.nsp.name)
    );
  }

  static disconnected({ socket, reason }) {
    console.log(
      chalk.red("client"),
      chalk.yellow(socket.id),
      chalk.red("disconnected"),
      chalk.red(reason)
    );
    console.log("");
  }

  static messageEvent({ socket, evt, msg }) {
    console.log(
      chalk.yellow(socket.id),
      "sent",
      evt,
      "with data",
      msg,
      chalk.cyan(socket.nsp.name)
    );
  }
}

module.exports = Logger;
