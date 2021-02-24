const router = require('express').Router();
const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkValidId, userController.getSingleUser);

router.post('/', userMiddleware.areUserDataOk, userController.addNewUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;
