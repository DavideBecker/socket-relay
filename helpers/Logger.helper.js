var chalk = require("chalk");

class Logger {
  static connected({ socket, namespace }) {
    console.log(
      chalk.green("client"),
      chalk.yellow(socket.id),
      chalk.green("connected to"),
      chalk.cyan(namespace.name)
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

  static messageEvent({ socket, evt, msg, namespace }) {
    console.log(
      chalk.yellow(socket.id),
      "sent",
      evt,
      "with data",
      msg,
      "to namespace",
      chalk.cyan(namespace.name)
    );
  }
}

module.exports = Logger;
