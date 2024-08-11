const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', protect, getAllUsers);
router.get('/users/:id', protect, getUserById);
router.put('/users/:id', protect, updateUser);
router.delete('/users/:id', protect, deleteUser);

module.exports = router;