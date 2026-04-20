const express = require('express');
const router = express.Router();
const {handleGetAllUsers, handleGetUserById,handleCreateUser, handleUpdateUserById, handleDeleteUserById} = require('../controllers/users');

// get all users
router.get('/', handleGetAllUsers);

// get user by id
router.get('/:id', handleGetUserById);

// add a new user
router.post('/', handleCreateUser);

// update user by id (PATCH)
router.patch('/:id', handleUpdateUserById);

// delete user by id
router.delete('/:id', handleDeleteUserById);

module.exports = router;