const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AUTH_DENIED, INVALID_TOKEN } = require("../constants");

module.exports = (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ message: AUTH_DENIED });
  }

  try {
    jwt.verify(token.split(" ")[1], process.env.AUTH_SECRET, (err, decoded) => {
      if (err) res.status(401).json({ message: INVALID_TOKEN });
      else {
        console.log("decoded:", decoded);
        req.body.id = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.log("middleware error");
    console.log(error);
    res.status(500).send(error);
  }
};
