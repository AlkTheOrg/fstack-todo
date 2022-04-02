const { Router } = require("express");
const todoPagesController = require("../controllers/todoPagesController");

const router = new Router();

router.get("/", todoPagesController.getTodoPages);
router.post("/", todoPagesController.createTodoPage);
router.delete("/", todoPagesController.deleteAll);
router.get("/:tpId", todoPagesController.getTodoPage);
router.post("/:tpId", todoPagesController.updateTodoPage);
router.delete("/:tpId", todoPagesController.deleteTodoPage);

module.exports = router;
