const { Router } = require('express');
const usersController = require('../controllers/usersController');

const router = new Router();

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);
router.delete('/', usersController.deleteAll); //TODO delete later
router.get('/:id', usersController.getUser);
router.post('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
