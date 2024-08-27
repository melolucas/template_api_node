const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/', authenticateToken, userController.updateUser);
router.post('/login', userController.loginUser);

module.exports = router;