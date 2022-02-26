const express = require("express");
const { validate, Joi } = require("express-validation");
const multer = require("multer");
const userRegister = require("../controllers/userControllers");

const uploads = multer({ dest: "uploads" });

const router = express();

const UserSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    image: Joi.string(),
  }),
};

router.post(
  "/register",
  uploads.single("image"),
  validate(UserSchema),
  userRegister
);

module.exports = router;
