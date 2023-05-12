const express = require("express");
const router = express.Router();
const { registerUser, loginUser, currentUser } = require("../Controller/userController")

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", currentUser)

module.exports = router;