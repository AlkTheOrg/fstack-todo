const { Router } = require("express");
const todosController = require("../controllers/todosController");

const router = new Router();

router.get("/", todosController.getTodos);
router.post("/", todosController.createTodo);
router.get("/:todoId", todosController.getTodo);
router.post("/:todoId", todosController.updateTodo);
router.delete("/:todoId", todosController.deleteTodo);

module.exports = router;
