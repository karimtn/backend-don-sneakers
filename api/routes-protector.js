const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = (req,res) => {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
}