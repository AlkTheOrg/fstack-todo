const { USER_NOT_FOUND, TODO_PAGE_NOT_FOUND } = require("../constants");
const User = require("../models/User");
const TodoPage = require("../models/TodoPage");
const { sendResponseIfExists } = require("../utils/sendResponseIfExists");
const Todo = require("../models/Todo");

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
    .then((dltdUser) => {
      if (dltdUser && dltdUser.todoPages) {
        console.log('dltdUser:', dltdUser);
        const todoPageIds = dltdUser.todoPages;
        for (let i = 0; i < todoPageIds.length; i++) {
          TodoPage.findByIdAndDelete(todoPageIds[i])
            .then(dltdTodoPage => {
              if (dltdTodoPage && dltdTodoPage.todos) {
                Todo.deleteMany({ id: { $in: dltdTodoPage.todos } })
                  .then(dltdPage => console.log(dltdPage))
                  .catch(err => res.status(404).send(err))
              } else 
                res.status(400).send(TODO_PAGE_NOT_FOUND);
            })
        }
        res.send(dltdUser);
      } else res.status(400).send(USER_NOT_FOUND);
    })
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
    .then((users) =>
      TodoPage.deleteMany({})
        .then((pages) =>
          Todo.deleteMany({})
            .then((todos) => res.send(users))
            .catch((err) => res.status(404).send(err))
        )
        .catch((err) => res.status(404).send(err))
    )
    .catch((err) => res.status(404).send(err));
};
