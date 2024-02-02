//sk_test_51NbkexEQoG2EqoC4ZNnnQePfWgaeB4Kn06K8mJj6WfJknVoXc3TpbzGkeAIOOHwp3Z7YVUC8jD774DHtBsskgWJy00bHaMWBJ6
const express = require("express");
const server = express();
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const cors = require("cors");

const PORT = process.env.PORT || 3500;

server.use(credentials);
server.use(cors(corsOptions));
server.use(express.static("public"));
server.use(express.json());

server.use("/checkout", require("./routes/checkout"));

server.listen(PORT, () => console.log(`server running on port ${PORT} successfully`));


// TODO

// 1. Research and install project dependencies: express-session, nodemon, mongodb,
// mongoose, cloudinary, passport, and multer.

// 2. Create MongoDB project database and figure out a way to connect with project. Create Mongoose data schemas and connect to database.

// 3. Implement API code, test and repeat.