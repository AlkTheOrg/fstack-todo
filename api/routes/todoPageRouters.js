const { Router } = require("express");
const todoPagesController = require("../controllers/todoPagesController");
const assignUrlParamToBody = require("../middlewares/assignUrlParamToBody");

const router = new Router();
const todosRouter = require('../routes/todoRoutes')

router.get("/", todoPagesController.getTodoPages);
router.post("/", todoPagesController.createTodoPage);
router.get("/:tpId", todoPagesController.getTodoPage);
router.post("/:tpId", todoPagesController.updateTodoPage);
router.delete("/:tpId", todoPagesController.deleteTodoPage);
router.use("/:tpId/todo", assignUrlParamToBody('tpId'), todosRouter)

module.exports = router;
