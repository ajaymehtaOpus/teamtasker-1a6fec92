const express = require('express');
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/admin-user-management.controller');
const router = express.Router();

// Route to get all users (Admin only)
router.get('/', getAllUsers);

// Route to create a new user (Admin only)
router.post('/', createUser);

// Route to update a user (Admin only)
router.put('/:id', updateUser);

// Route to delete a user (Admin only)
router.delete('/:id', deleteUser);

module.exports = router;