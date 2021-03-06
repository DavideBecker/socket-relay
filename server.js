// TODO: Remove for staging or prod
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const fs = require("fs");
const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const Logger = require("./helpers/Logger.helper");

const port = process.env.PORT || 8337;

// Uncomment this to test it locally
// app.get("/test", function (req, res) {
//   res.sendFile(__dirname + "/examples/client-example.html");
// });
// app.get("/second", function (req, res) {
//   res.sendFile(__dirname + "/examples/second-namespace.html");
// });

// Listen to all namespaces
io.of(/.*/).on("connection", function (socket) {
  // Connection log message
  Logger.connected({ socket });

  // Listen to all socket events
  socket.onAny((event, ...args) => {
    // If it's a message event (From the clients socket.send() method)
    if (event == "message") {
      // Seperate the message and data
      const evt = args.shift();
      const msg = args;

      // Log the event in the console
      Logger.messageEvent({ socket, evt, msg });

      // Emit the event to all other clients
      socket.broadcast.emit(evt, msg);
    }
  });

  // Send a message on disconnect
  socket.on("disconnect", (reason) => {
    Logger.messageEvent({ socket, reason });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
server.listen(port, function () {
  console.log("listening on *:" + port);
  console.log("");
});
