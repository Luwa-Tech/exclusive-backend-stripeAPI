const bcrypt = require("bcrypt");

const comparePassword = async (candidatePassword, hashedPassword) => {
    try {
      const isMatch = await bcrypt.compare(candidatePassword, hashedPassword);
      return isMatch;
    } catch (error) {
        console.log(`${error.message}`);
    }

  };

module.exports = comparePassword;