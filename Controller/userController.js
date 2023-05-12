const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/userModels")
const jwt = require("jsonwebtoken")


//register User
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User Already registered")
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if (user) {
        res.status(201).json({ message: "Register successfully", _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }
})

//login User
//endPoint:/contacts.login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
        )
        res.status(200).json({ message: "login successfully", accessToken: accessToken })
    } else {
        res.status(401);
        throw new Error("email or password is incorrect")
    }
})

//@desc Current user info
//@route POST /contacts/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)
})
module.exports = { registerUser, loginUser, currentUser }