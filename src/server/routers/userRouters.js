const express = require("express");
const app = require("..");
const userRegister = require("../controllers/userControllers");

const router = express();

app.post("/register", userRegister);

module.exports = router;
