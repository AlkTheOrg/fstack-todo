const { Router } = require("express");
const authsController = require("../controllers/authsController");

const router = new Router();

router.post('/signup', authsController.signup);
router.post('/login', authsController.login);

module.exports = router;
