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
    required: false,
  },
  row: {
    type: Number,
    required: false,
  },
  col: {
    type: Number,
    required: false,
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
