const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.maxAgeDays = days => days * 24 * 60

module.exports.generateToken = (user, maxAge = "1d") => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    process.env.AUTH_SECRET,
    { expiresIn: maxAge }
  )
}
