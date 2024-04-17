const User = require("../model/User");
const passport = require("passport");

const handleSignup = async (req, res) => {
    const {firstname, lastname, password, email} = req.body;

    //Refactor validation
    if (!firstname || !lastname || !password) {
        return res.status(400).json({"message": "Fullname and password is required"});
    }

    const duplicate = await User.findOne({"email": email}).exec();
    if (duplicate) {
        return res.sendStatus(409);
    }

    try {
        const user = new User({
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password
        });

        await user.save();
    } catch (err) {
        res.status(500).json({"message": `${err.message}`});
    }
}

const handleLogin = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({"message": "Email and Password is required!"});
    }
}

module.exports = {handleSignup, handleLogin};