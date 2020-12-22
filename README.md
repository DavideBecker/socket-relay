# socket-relay

This is a simple socket server intended for frontend development work when the socket backend isn't implemented yet.

By default the server just broadcasts all events sent to it back to all other connected clients.

It supports dynamic namespaces, so you can use it for as many projects as you need.

## Usage

### Backend - Start server

Clone this repository and start the server with `npm start`. By default it runs on port 3000. For easy debugging it has decently gracious logging.

### Frontend - Connect clients

It's supposed to be a drop-in replacement for development, so the front-end syntax stays the same. If you intend to keep the server running and use it for multiple projects you should set a namespace, so the events don't interfere with each other.

All socket.io configuration variables work as expected, so the server can run on a different URL than the client

```javascript
// Connect to namespace
const socket = io("/test");

socket.on("connect", () => {
  // Send a test event with your own ID
  socket.send("test", socket.id);
  console.log("client connected", socket.id);
});

// Open another window and the first window should receive the ID of the 2nd one
socket.on("test", (msg) => {
  console.log("received", msg);
});

socket.on("disconnect", () => {
  console.log("client disconnected", socket.id);
});
```
