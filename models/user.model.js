const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameRoom = new Schema({
  game: {
    type: String,
    required: false,
  },
  roomId: {
    type: String,
    required: false,
  },
});

const user = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gameRooms: [gameRoom],
    gameID: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", user);
