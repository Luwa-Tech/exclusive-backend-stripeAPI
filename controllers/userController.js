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

        req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            res.status(201).json({"message": "New user created and logged in successfully"})
          });
    } catch (err) {
        res.status(500).json({"message": `${err.message}`});
    }
}

const handleLogin = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({"message": "Email and Password is required!"});
    }

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(401).json({ "message": "Invalid Email or Password." });
          }
  
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            res.status(202).json({"message": "User logged in successfully", "user": user})
          });
    })(req, res, next);
}

module.exports = {handleSignup, handleLogin};