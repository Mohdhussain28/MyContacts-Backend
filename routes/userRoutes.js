const express = require("express");
const router = express.Router();
const { registerUser, loginUser, currentUser } = require("../Controller/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current/:id", validateToken, currentUser)

module.exports = router;