require("dotenv").config();
const express = require("express");
const server = express();
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const cors = require("cors");
const connectDB = require("./config/dbConn");

connectDB();

const PORT = process.env.PORT || 3500;

server.use(credentials);
server.use(cors(corsOptions));
server.use(express.static("public"));
server.use(express.json());

// Setup Sessions - stored in MongoDB
// server.use(
//     session({
//       secret: "keyboard cat",
//       resave: false,
//       saveUninitialized: false,
//       store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     })
//   );

server.use("/checkout", require("./routes/checkout"));

server.listen(PORT, () => console.log(`server running on port ${PORT} successfully`));


// TODO

// 1. Research and install project dependencies: express-session, nodemon, mongodb,
// mongoose, cloudinary, passport --DONE.

// 2. Create MongoDB project database and figure out a way to connect with project. Create Mongoose data schemas and connect to database.

// 3. Implement Admin authentication logic.

// 4. Implement user auth, cart, and wishlist logic.