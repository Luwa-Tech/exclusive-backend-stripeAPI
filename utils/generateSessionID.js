const  uuid  = require("uuid");


const generateSessionID = () => {
    return uuid.v4()
};

module.exports = generateSessionID;