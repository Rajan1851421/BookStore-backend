import express from 'express';
import {  deleteUserById, fetchAllUser, loginUser } from '../controller/login.controller.js'; // Adjust the path as needed
import { registerUser } from '../controller/login.controller.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

//delete user route

router.delete('/user/:id', deleteUserById);


// get all user
router.get('/user', fetchAllUser);

export default router;
