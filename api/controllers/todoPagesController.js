const { TODO_PAGE_NOT_FOUND, USER_NOT_FOUND } = require("../constants");
const TodoPage = require("../models/TodoPage");
const Todo = require("../models/Todo");
const User = require("../models/User");
const { sendResponseIfExists } = require("../utils/sendResponseIfExists");

module.exports.getTodoPages = (req, res) => {
  User.find({ _id: req.body.id })
    .populate("todoPages")
    .then((user) =>
      sendResponseIfExists(
        user.length && user[0] && user[0].todoPages,
        res,
        TODO_PAGE_NOT_FOUND,
        404
      )
    )
    .catch((err) => res.status(404).send(err));
};

module.exports.getTodoPage = (req, res) => {
  const { tpId } = req.params;
  TodoPage.findOne({ _id: tpId })
    .then((todoPage) =>
      sendResponseIfExists(todoPage, res, TODO_PAGE_NOT_FOUND, 404)
    )
    .catch((err) => res.status(404).send(err));
};

module.exports.createTodoPage = (req, res) => {
  const todoPage = new TodoPage(req.body);
  User.findOneAndUpdate(
    { _id: req.body.id },
    { $push: { todoPages: todoPage._id } }
  ).then((result) => {
    console.log("RES:", result);
    if (result) {
      todoPage
        .save()
        .then((savedTodoPage) => res.send(savedTodoPage))
        .catch((err) => res.status(400).send(err));
    } else res.status(400).send(USER_NOT_FOUND);
  });
};

module.exports.updateTodoPage = (req, res) => {
  const { tpId } = req.params;
  TodoPage.findByIdAndUpdate(tpId, req.body, { new: true, runValidators: true })
    .then((todoPage) =>
      sendResponseIfExists(todoPage, res, TODO_PAGE_NOT_FOUND, 400)
    )
    .catch((err) => res.status(404).send(err));
};

module.exports.deleteTodoPage = (req, res) => {
  const { tpId } = req.params;
  User.findOneAndUpdate(
    { _id: req.body.id },
    { $pull: { todoPages: tpId } }
  ).then((result) => {
    console.log("RES:", result);
    if (result) {
      TodoPage.findByIdAndDelete(tpId)
        .then((deleted) => {
          if (deleted && deleted.todos) {
            Todo.deleteMany({ id: { $in: deleted.todos } })
              .then((deletedTodosInfo) => res.send(deleted))
              .catch((err) => res.status(404).send(err));
          } else res.status(400).send(TODO_PAGE_NOT_FOUND);
        })
        .catch((err) => res.json(err));
    } else res.status(400).send(USER_NOT_FOUND);
  });
};
