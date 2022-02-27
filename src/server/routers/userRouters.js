const express = require("express");
const { validate, Joi } = require("express-validation");
const {
  userRegister,
  listUsers,
  userLogin,
} = require("../controllers/userControllers");

const router = express();

const UserSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    image: Joi.string(),
  }),
};

router.post("/register", validate(UserSchema), userRegister);
router.post("/login", userLogin);
router.get("/list", listUsers);

module.exports = router;
