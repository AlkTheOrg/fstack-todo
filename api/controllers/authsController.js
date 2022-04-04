const { USER_NOT_FOUND, PASSWORD_DOESNT_MATCH } = require("../constants");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtToken");

module.exports.signup = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((savedUser) => {
      const token = generateToken(savedUser);
      res.send(user.toAuthJSON(token));
    })
    .catch((err) => {
      if (!err.errors) res.status(404).send(err);
      const firstErrorKey = Object.keys(err.errors)[0];
      if (!firstErrorKey) res.status(404).send(err);
      else res.status(404).json({ message: err.errors[Object.keys(err.errors)[0]].message });
    });
};

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        console.log("before token");
        const token = generateToken(user);
        console.log("token:", token);
        res.send(user.toAuthJSON(token));
      } else {
        res.status(400).json({ message: PASSWORD_DOESNT_MATCH });
      }
    } else {
      res.status(400).json({ message: USER_NOT_FOUND });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
