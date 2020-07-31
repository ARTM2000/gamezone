const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const constants = require("./util/constant");
//you have to create a constant.js file like
//the sample before running the project
const socketIO = require("./socket");

//v1.api routes
const routesV1 = require("./routes/api.rt");

const app = express();
app.use(bodyParser.json());

app.use("/v1/api", routesV1);
app.get("/", (req, res, next) => res.send("hello"));

app.use((err, req, res, next) => {
  res.json(err);
})

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
