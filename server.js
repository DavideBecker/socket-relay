const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const Logger = require("./helpers/Logger.helper");

const port = process.env.PORT || 3000;

// Uncomment this to test it locally
// app.get("/test", function (req, res) {
//   res.sendFile(__dirname + "/examples/client-example.html");
// });
// app.get("/second", function (req, res) {
//   res.sendFile(__dirname + "/examples/second-namespace.html");
// });

// Allow all connections
io.set("origins", "*:*");

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

// Start server
http.listen(port, function () {
  console.log("listening on *:" + port);
  console.log("");
});
