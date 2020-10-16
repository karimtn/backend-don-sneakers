const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

// # MIDDLEWARES # 
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(helmet);

// # SERVER PORT#
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)});
