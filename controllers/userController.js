const User = require("../model/User");

const handleSignup = async (req, res) => {
    const {firstname, lastname, password, email} = req.body;

    if (!firstname || !lastname || !password) {
        return res.status(400).json({"message": "Fullname and password is required"});
    }

    const duplicate = await User.findOne({"email": email}).exec();
    if (duplicate) {
        return res.sendStatus(409);
    }

    try {
        const result = new User({
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password
        });

        console.log(result);
        await result.save();
        res.status(201).json({"message": "New user has been created!"});
    }catch(err) {
        res.status(500).json({"message": `${err.message}`});
    }
}

// const handleLogin = async (req, res) => {

// }

module.exports = {handleSignup};