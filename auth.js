const express = require("express");
const router = express.Router();
const authController = require("./authController");

// 從 authController 解構出函式
const { register, login } = authController;

router.post("/register", register);
router.post("/login", login);

module.exports = router;
