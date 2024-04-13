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

require("./config/passport")(passport);

connectDB();

const PORT = process.env.PORT || 3500;

server.use(credentials);
server.use(cors(corsOptions));
server.use(express.static("public"));
server.use(express.json());

const sessionStore = MongoStore.create({
  client: mongoose.connection.getClient(),
  collectionName: "sessions"
});

//Setup Sessions - stored in MongoDB
server.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
      }
    })
  );

server.use(passport.initialize());
server.use(passport.session());

server.use("/", require("./routes/user"));
server.use("/products", require("./routes/product"));
server.use("/api/user/wishlist", require("./routes/wishlist"));
server.use("/api/user/cart", require("./routes/cart"));
server.use("/api/user/checkout", require("./routes/checkout"));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  server.listen(PORT, () => {
      console.log(`Server running on ${PORT} successfully`)
  })
})