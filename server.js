require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
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

//Setup Sessions - stored in MongoDB
server.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({ client: mongoose.connection.getClient() }),
    })
  );

// Passport middleware
server.use(passport.initialize());
server.use(passport.session());

//TESTING PURPOSES
// const newad = async () =>{
//   const newAdmin = new Admin({name: "umar faruq"})
// console.log(newAdmin.name)
// await newAdmin.save()
// }

// newad()

server.use("/checkout", require("./routes/checkout"));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  server.listen(PORT, () => {
      console.log(`Server running on ${PORT} successfully`)
  })
})