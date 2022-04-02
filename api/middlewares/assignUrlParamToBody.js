module.exports = (key) => {
  return (req, res, next) => {
    const val = req.params[key];
    if (val) req.body[key] = val;
    next();
  }
}
