const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
  username: {
    type: String,
    required: true,
  },
});

const act = new Schema({
  userId: {
    type: String,
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
  col: {
    type: Number,
    required: true,
  },
});

const doozRoom = new Schema(
  {
    users: [user],
    acts: [act],
    winner: {
      type: String, //userId of winner player
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DoozRoom", doozRoom);
