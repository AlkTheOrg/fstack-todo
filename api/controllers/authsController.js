const { USER_NOT_FOUND, PASSWORD_DOESNT_MATCH } = require("../constants");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtToken");

module.exports.signup = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((savedUser) => res.send(savedUser))
    .catch((err) => res.send(err));
};

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const result = bcrypt.compare(req.body.password, user.password)
      if (result) {
        console.log('before token')
        const token = generateToken(user);
        console.log('token:', token)
        res.json({ token });
      } else {
        res.status(400).json({ error: PASSWORD_DOESNT_MATCH})
      }
    } else {
      res.status(400).json({ error: USER_NOT_FOUND})
    }
  } catch(error) {
    console.log(error);
    res.status(400).json({ error })
  }
}
