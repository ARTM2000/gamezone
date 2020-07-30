const socket = require("socket.io");

let io;
let agentSocket;
let turn = true;

module.exports = {
  creatSocket: (server) => {
    io = socket(server);
    io.on("connection", (socket) => {
      console.log(`New user with ${socket.id} socket id`)
      agentSocket = socket;

      socket.emit("hi", { msg: "hello from socket" });

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
    return io;
  },
  getIO: () => {
    if (!io) throw new Error("IO did not set :/");
    return io;
  },
};
