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
      .isLength({min: 5})
      .withMessage("Password is not long enough")
      .bail()
      .isAlphanumeric()
      .withMessage("Password should contain numbers and alphabets"),
  ],
  userController.onNewUser
);
router.post("/login", () => {});

module.exports = router;
