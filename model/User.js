const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstname: { 
        type: String, 
        required: true 
    },
    lastname: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }

});

// Password hash middleware.

userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  });

module.exports = mongoose.model("User", userSchema);