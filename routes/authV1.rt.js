const express = require("express");
const { body } = require("express-validator");

const userController = require("../controllers/user.ct");
const User = require("../models/user.model");

const router = express.Router();

//handling user authentication
router.post(
  "/new-user",
  [
    body("username")
      .notEmpty()
      .withMessage("Username should not be empty")
      .bail()
      .isLength({ min: 2 })
      .withMessage("username is not long enough"),
    body("email")
      .notEmpty()
      .withMessage("Email should not be empty")
      .bail()
      .isEmail()
      .withMessage("Email format is false"),
    body("pass")
      .notEmpty()
      .withMessage("Password should not be empty")
      .bail()
      .isLength({ min: 5 })
      .withMessage("Password is not long enough"),
  ],
  userController.onNewUser
);

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email should not be empty")
      .bail()
      .isEmail()
      .withMessage("Email is not in correct format"),
    body("pass")
      .notEmpty()
      .withMessage("Password should not be empty")
      .bail()
      .isLength({ min: 5 })
      .withMessage("Password is not long enough"),
  ],
  userController.onLogin
);

router.post(
  "/verify",
  [body("token").notEmpty().withMessage("Data is not valid")],
  userController.onVerify
);

module.exports = router;
