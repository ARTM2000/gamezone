const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const socketIO = require("./socket");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res, next) => res.send("hello"));

const PORT = process.env.PORT || 5000;

//connect to mongoDB

const server = app.listen(5000, () =>
  console.log(`server running on \"http://localhost:${PORT}\"`)
);

const io = socketIO.creatSocket(server);

//sample turn handler
let turn = true;

io.on("connection", (socket) => {
  console.log(`new user with ${socket.id} ID`);
  /* listen for sockets --> */

  //for testing socket
  socket.emit("hi", { msg: "hello" });

  //on join Dooz game
  socket.on("joinDooz", () => {
    socket.emit("DoozTurn", { allow: turn });
    turn = !turn;
  });

  //on receiving act for Dooz game
  socket.on("sendActDooz", (data) => {
    socket.broadcast.emit("receiveActDooz", data);
  });
});
