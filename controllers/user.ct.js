const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/user.model");

const errorFormatter = (value, msg) => {
  const error = {
    value,
    msg,
  };
  return error;
};

exports.onNewUser = async (req, res, next) => {
  // validating inputs
  const errors = [];
  const foundErrors = validationResult(req);
  if (!foundErrors.isEmpty()) {
    foundErrors.array().forEach((el) => {
      errors.push(errorFormatter(el.value, el.msg));
    });
  }
  if (errors.length > 0) {
    res.json(errors);
  } else {
    //in case of no error
    const { username, email, pass } = req.body;
    const password = await bcrypt.hash(pass, 12);
    const userExist = await User.findOne({ email });
    if (userExist) {
      const error = { status: 401, msg: "This account exist" }
      next(error)
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
        const error = { status: 500, msg: "Some problem in creating user" };
        next(error);
      }
    }
  }
};
