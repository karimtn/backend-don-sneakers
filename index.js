const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors")
const app = express();
require("dotenv").config();

// # MIDDLEWARES # 
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(helmet());
app.use(cors())

// # API MIDDLEWARES ADMIN #
const admin_authentication = require("./api/admin/admin-authentication")
const admin_user_management_methods = require("./api/admin/user-management-methods")
const admin_product_methods = require("./api/admin/admin-product-methods")
const admin_reset_password = require("./api/admin/admin-reset-password")
const payment = require("./api/admin/admin-payment")
app.use("/app/admin", admin_authentication)
app.use("/app/admin", admin_user_management_methods)
app.use("/app/admin", admin_product_methods)
app.use("/app/admin", admin_reset_password)
app.use("/app/admin", payment )

// #  API MIDDLEWARES USER  #
const user_authentication = require("./api/user/user-authentication")
const user_product_methods = require("./api/user/user-product-methods")
const user_reset_password = require("./api/user/user-reset-password")
app.use("/app/user", user_authentication)
app.use("/app/user", user_product_methods)
app.use("/app/user", user_reset_password)

//#  API MIDDLEWARES SHARED  #

// # DATABASE CONNECTION #
const DB_URL = process.env.MONGODB_URL;

mongoose.connect(DB_URL, {useNewUrlParser: true, useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

// # PORT VARIABLE AND SERVER LISTENING #
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)});
