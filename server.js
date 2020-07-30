const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const constants = require("./util/constant");
//you have to create a constant.js file like
//the sample before running the project
const socketIO = require("./socket");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res, next) => res.send("hello"));

const PORT = process.env.PORT || 5000;

//connect to mongoDB
mongoose.connect(constants.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) console.log(err);

  const server = app.listen(5000, () =>
    console.log(`server running on \"http://localhost:${PORT}\"`)
  );

  socketIO.creatSocket(server);
});
