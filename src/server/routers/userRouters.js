const express = require("express");
const { validate, Joi } = require("express-validation");
const multer = require("multer");

const upload = multer({ dest: "uploads" });

const {
  userRegister,
  listUsers,
  userLogin,
  addFriend,
} = require("../controllers/userControllers");
const auth = require("../middlewares/auth");

const router = express();

const UserSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

router.post(
  "/register",
  upload.single("image"),
  validate(UserSchema),
  userRegister
);
router.post("/login", userLogin);
router.get("/list", auth, listUsers);
router.post("/friend", auth, addFriend);

module.exports = router;
