const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { graphqlHTTP } = require("express-graphql");

const constants = require("./util/constant");
//you have to create a constant.js file like
//the sample before running the project
const socketIO = require("./socket");
//v1.auth routes
const routesV1 = require("./routes/authV1.rt");
const schema = require("./graphql/schema");

const app = express();
app.use(bodyParser.json());

/* should move after development to route protection */
app.use(
  "/v1/api",
  graphqlHTTP({
    schema,
    graphiql: process.env.MODE !== "production",
  })
);
/* until here */
app.get("/*", (req, res, next) =>
  res.send(
    "<h3 style='text-align: center;'>Hello, welcome to this project</h3>"
  )
);
app.use("/v1/auth", routesV1);
app.use((req, res, next) => {
  const authToken = req.header["Authentication"];
  if (authToken) {
    const token = authToken.split(" ")[1];
    const information = jwt.verify(token, constants.jwtSecret);

    if (information) {
      req.userInformation = information;
      next();
    } else {
      const error = { status: 403, msg: "Your token is out of date" };
      next(error);
    }
  } else {
    const error = { status: 403, msg: "Not authorized" };
    next(error);
  }
});
// app.use("/v1/api", graphqlHTTP({
//   schema,
//   graphiql: process.env.MODE !== "production"
// }));

app.use((err, req, res, next) => {
  res.json(err);
});

const PORT = process.env.PORT || 5000;

//connect to mongoDB
mongoose.connect(
  constants.db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);

    const server = app.listen(5000, () =>
      console.log(`server running on \"http://localhost:${PORT}\"`)
    );

    socketIO.creatSocket(server);
  }
);
