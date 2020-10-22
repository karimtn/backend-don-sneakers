const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY, null);
    req.userInfo = decoded;
    console.log(req.userInfo)
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("To continue you shold be logged in");
  }
};
