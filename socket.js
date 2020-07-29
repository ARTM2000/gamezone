const socket = require("socket.io");

let io;

module.exports = {
    creatSocket: (server) => {
        io = socket(server);
        return io;
    },
    getIO: () => {
        if(!io) throw new Error("IO did not set :/");
        return io;
    }
}