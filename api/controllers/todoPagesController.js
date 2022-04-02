const { TODO_PAGE_NOT_FOUND } = require("../constants");
const TodoPage = require("../models/TodoPage");
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
    todoPage
      .save()
      .then((savedTodoPage) => res.send(savedTodoPage))
      .catch((err) => res.status(400).send(err));
  });
};

module.exports.updateTodoPage = (req, res) => {
  const { tpId } = req.params;
  TodoPage.findByIdAndUpdate(tpId, req.body, { new: true, runValidators: true })
    .then((todoPage) =>
      sendResponseIfExists(todoPage, res, TODO_PAGE_NOT_FOUND, 404)
    )
    .catch((err) => res.status(400).send(err));
};

module.exports.deleteTodoPage = (req, res) => {
  const { tpId } = req.params;
  User.findOneAndUpdate(
    { _id: req.body.id },
    { $pull: { todoPages: tpId } }
  ).then((result) => {
    console.log("RES:", result);
    TodoPage.findByIdAndDelete(tpId)
      .then((deleted) =>
        sendResponseIfExists(deleted, res, TODO_PAGE_NOT_FOUND, 400)
      )
      .catch((err) => res.json(err));
  });
};

module.exports.deleteAll = (req, res) => {
  User.findOneAndUpdate({ _id: req.body.id }, { $set: { todoPages: [] } })
    .then((result) =>
      TodoPage.deleteMany({ id: { $in: result.todoPages } })
        .then((result2) => res.send(result2))
        .catch((err) => res.status(404).send(err))
    )
    .catch((err) => res.status(404).send(err));
};
