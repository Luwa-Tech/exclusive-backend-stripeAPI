require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const cors = require("cors");
const connectDB = require("./config/dbConn");
//const { auth } = require("express-oauth2-jwt-bearer");

const PORT = process.env.PORT || 3500;

connectDB();

server.use(credentials);
server.use(cors(corsOptions));
server.use(express.static("public"));
server.use(express.json());

server.use("/products", require("./routes/product"));

// const jwtCheck = auth({
//   audience: process.env.AUTH0_AUDIENCE,
//   issuerBaseURL: process.env.AUTH0_DOMAIN,
//   tokenSigningAlg: "RS256"
// });

//server.use(jwtCheck);

server.use("/api/user/wishlist", require("./routes/wishlist"));
server.use("/api/user/cart", require("./routes/cart"));
server.use("/api/user/checkout", require("./routes/checkout"));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  server.listen(PORT, () => {
      console.log(`Server running on ${PORT} successfully`)
  })
})