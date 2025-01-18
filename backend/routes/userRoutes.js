import express from 'express';
import userController from '../src/controllers/userController.js';

const router = express.Router();

// Define routes for users

router.post('/', userController.validateParams, userController.createUser);

router.get('/:id', userController.getUser);

router.patch('/:id', userController.validateParams, userController.updateUser);

router.delete('/:id', userController.deleteUser);



export default router;
