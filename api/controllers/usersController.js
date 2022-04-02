const { USER_NOT_FOUND } = require("../constants");
const User = require("../models/User");
const { sendResponseIfExists } = require("../utils/sendResponseIfExists");

module.exports.getUsers = (_, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(404).send(err));
};

module.exports.createUser = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((savedUser) => res.send(savedUser))
    .catch((err) => res.send(err));
};

module.exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id })
    .then((found) => sendResponseIfExists(found, res, USER_NOT_FOUND, 404))
    .catch((err) => res.status(404).send(err));
};

module.exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((dltdUser) => sendResponseIfExists(dltdUser, res, USER_NOT_FOUND, 404))
    .catch((err) => res.send(err));
};

module.exports.updateUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((user) => sendResponseIfExists(user, res, USER_NOT_FOUND, 404))
    .catch((err) => res.status(404).send(err));
};

//TODO delete later
module.exports.deleteAll = (_, res) => {
  User.deleteMany({})
    .then((users) => res.send(users))
    .catch((err) => res.status(404).send(err));
};