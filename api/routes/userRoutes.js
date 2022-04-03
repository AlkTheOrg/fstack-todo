const { Router } = require("express");
const usersController = require("../controllers/usersController");
const assignUrlParamToBody = require('../middlewares/assignUrlParamToBody')

const router = new Router();
const todoPageRouter = require("../routes/todoPageRouters");

router.get("/", usersController.getUsers);
// router.post("/", usersController.createUser);
router.delete("/", usersController.deleteAll); //TODO delete later
router.get("/:id", usersController.getUser);
router.post("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);
router.use("/:id/todo-page", assignUrlParamToBody('id'), todoPageRouter);

module.exports = router;
