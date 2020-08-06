const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const constants = require("../util/constant");

const errorPusher = (req) => {
  const errorFormatter = (value, msg) => {
    const error = {
      value,
      msg,
    };
    return error;
  };

  const errors = [];
  const foundErrors = validationResult(req);
  if (!foundErrors.isEmpty()) {
    foundErrors.array().forEach((el) => {
      errors.push(errorFormatter(el.value, el.msg));
    });
  }

  return errors;
};

const genUserGameId = (userId) => {
  let firstPart = new Date().getTime();
  firstPart = firstPart % 100000000;
  const secondPart = userId.toString().slice(0, 9);
  const thirdPart = Math.floor(Math.random()*1000);

  const gameId = `gi${firstPart}${secondPart}${thirdPart}`;

  return gameId;
}

exports.onNewUser = async (req, res, next) => {
  // validating inputs
  const errors = errorPusher(req);
  if (errors.length > 0) {
    next(errors);
  } else {
    //in case of no error
    const { username, email, pass } = req.body;
    const password = await bcrypt.hash(pass, 12);
    const userExist = await User.findOne({ email });
    if (userExist) {
      const error = { status: 401, msg: "This account exist" };
      next(error);
    } else {
      const newUser = new User({
        username,
        email,
        password,
      });

      const thisNewUser = await newUser.save();
      if (thisNewUser) {
        res.json({ email, msg: "User generated" });
      } else {
        //in case of fault in saving user into db
        const error = { status: 500, msg: "Some problem in creating user" };
        next(error);
      }
    }
  }
};

exports.onLogin = async (req, res, next) => {
  //validating inputs
  const errors = errorPusher(req);
  if (errors.length > 0) {
    next(errors);
  } else {
    const { email, pass } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      //if user not found
      const error = { status: 403, msg: "This account does not exist" };
      next(error);
    } else {
      const passwordValid = await bcrypt.compare(pass, user.password);
      if (!passwordValid) {
        //if password is not valid
        const error = { status: 403, msg: "The password is not correct" };
        next(error);
      } else {
        //creating a gameID
        user.gameID = genUserGameId(user._id);
        await user.save()

        //creating the authToken
        const authToken = jwt.sign(
          { userId: user._id, email: user.email },
          constants.jwtSecret,
          { expiresIn: "6 days" }
        );

        const response = {
          token: authToken,
          username: user.username,
          id: user._id,
          valid: true
        };

        res.json(response);
      }
    }
  }
};

exports.onVerify = (req, res, next) => {
  // For verifying jwt whenever it needs
  const { token } = req.body;
  const errors = errorPusher(req);
  if(errors.length > 0) {
    next(errors);
  } else {
    const information = jwt.verify(token, constants.jwtSecret);
    if(!information) {
      // In case that token expired
      const response = {
        valid: false,
        status: 403,
      };
      res.json(response);
    } else {
      // Validation succeeds
      const response = {
        valid: true,
        status: 200,
      }
      res.json(response)
    }
  }
}