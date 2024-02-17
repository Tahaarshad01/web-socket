import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true,
  },
});
const port = 8080;

io.on("connection", (socket) => {
  console.log("what is socket", socket);
  console.log("Socket is active to be connected ");

  socket.on("chat-app", (payload) => {
    console.log("what is payload", payload);
    io.emit("chat-emit", payload);
  });
});
// app.listen(() => {
//   console.log("server is connectedon port " + port);
// });

httpServer.listen(port, () => {
  console.log("server is running on port..." + port);
});
