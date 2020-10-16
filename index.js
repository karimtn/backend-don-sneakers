const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

// # MIDDLEWARES # 
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(helmet());

// # API MIDDLEWARES ADMIN #
const product_methods = require("./api/admin/product-methods")
app.use("/app/admin", product_methods)

const authentication_admin = require("./api/admin/authentication-admin")
app.use("/app/admin", authentication_admin)

// # API MIDDLEWARES USER #
const authentication_user = require("./api/user/authentication-user")
app.use("/app/user", authentication_user)

// # DATABASE CONNECTION #
const DB_URL = process.env.MONGODB_URL;

mongoose.connect(DB_URL, {useNewUrlParser: true, useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

// # SERVER PORT#
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)});
