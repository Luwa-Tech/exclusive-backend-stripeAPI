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
//const dbConnection = mongoose.createConnection(process.env.DB_URI);
const connectDB = require("./config/dbConn");

require("./config/passport")(passport);

connectDB();

const PORT = process.env.PORT || 3500;

server.use(credentials);
server.use(cors(corsOptions));
server.use(express.static("public"));
server.use(express.json());

const sessionStore = MongoStore.create({
  client: mongoose.connection.getClient(),
  collectionName: "session"
});

//Setup Sessions - stored in MongoDB
server.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 //Equals 24 hours
      }
    })
  );

// Passport middleware
server.use(passport.initialize());
server.use(passport.session());

server.use("/", require("./routes/user"));
server.use("/checkout", require("./routes/checkout"));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  server.listen(PORT, () => {
      console.log(`Server running on ${PORT} successfully`)
  })
})