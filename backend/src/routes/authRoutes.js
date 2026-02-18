const express = require("express");
const { register, login } = require("../controllers/authController");
const validate = require("../middleware/validateMiddleware");
const { registerValidation, loginValidation } = require("../utils/validators");

const router = express.Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);

module.exports = router;
