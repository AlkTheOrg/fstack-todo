const { Router } = require("express");
const usersController = require("../controllers/usersController");
const assignUrlParamToBody = require('../middlewares/assignUrlParamToBody');
const userUpdatesOwnContent = require('../middlewares/userUpdatesOwnContent')

const router = new Router();
const todoPageRouter = require("../routes/todoPageRouters");

router.get("/", usersController.getUsers);
router.delete("/", usersController.deleteAll); //TODO delete later
router.get("/:id", userUpdatesOwnContent, usersController.getUser);
router.post("/:id", userUpdatesOwnContent, usersController.updateUser);
router.delete("/:id", userUpdatesOwnContent, usersController.deleteUser);
// checkAuth already does assigning id to body
router.use("/:id/todo-page", userUpdatesOwnContent, todoPageRouter);

module.exports = router;
