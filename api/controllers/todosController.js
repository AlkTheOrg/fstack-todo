const { TODO_NOT_FOUND, TODO_PAGE_NOT_FOUND } = require("../constants");
const TodoPage = require("../models/TodoPage");
const Todo = require("../models/Todo");
const { sendResponseIfExists } = require("../utils/sendResponseIfExists");

module.exports.getTodos = (req, res) => {
  TodoPage.find({ _id: req.body.tpId })
    .populate("todos")
    .then((page) =>
      sendResponseIfExists(
        page.length && page[0] && page[0].todos,
        res,
        TODO_NOT_FOUND,
        404
      )
    )
    .catch((err) => res.status(404).send(err));
};

module.exports.getTodo = (req, res) => {
  const { todoId } = req.params;
  Todo.findOne({ _id: todoId })
    .then((todo) => sendResponseIfExists(todo, res, TODO_NOT_FOUND, 404))
    .catch((err) => res.status(404).send(err));
};

module.exports.createTodo = (req, res) => {
  const todo = new Todo(req.body);
  TodoPage.findOneAndUpdate(
    { _id: req.body.tpId },
    { $push: { todos: todo._id } }
  ).then((result) => {
    console.log("RES: ", result);
    if (result)
      todo
        .save()
        .then((savedTodo) => res.send(savedTodo))
        .catch((err) => res.status(404).send(err));
    else res.status(400).send(TODO_PAGE_NOT_FOUND);
  });
};

module.exports.updateTodo = (req, res) => {
  const { todoId } = req.params;
  Todo.findByIdAndUpdate(todoId, req.body, { new: true, runValidators: true })
    .then((todo) => sendResponseIfExists(todo, res, TODO_NOT_FOUND, 400))
    .catch((err) => res.status(404).send(err));
};

module.exports.deleteTodo = (req, res) => {
  const { todoId } = req.params;
  TodoPage.findOneAndUpdate(
    { _id: req.body.tpId },
    { $pull: { todos: todoId } }
  ).then((result) => {
    console.log("RES:", result);
    if (result) {
      Todo.findByIdAndDelete(todoId)
        .then((deleted) =>
          sendResponseIfExists(deleted, res, TODO_NOT_FOUND, 400)
        )
        .catch((err) => res.status(404).send(err));
    } else {
      res.status(400).send(TODO_PAGE_NOT_FOUND);
    }
  });
};
