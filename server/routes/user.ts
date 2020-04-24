import express from 'express';

import userController from '../controllers/user';

const router = express.Router();

/**
 * $route POST user/signup
 */
router.post('/signup', userController.postSignup);

/**
 * $route POST user/login
 */
router.post('/login', userController.postLogin);

export default router;
