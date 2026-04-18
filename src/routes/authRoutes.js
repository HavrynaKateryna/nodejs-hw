import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/authController.js';

import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

//
// 🟢 REGISTER
//
router.post(
  '/auth/register',
  celebrate({ body: registerUserSchema }),
  registerUser
);

//
// 🟡 LOGIN
//
router.post('/auth/login', celebrate({ body: loginUserSchema }), loginUser);

//
// 🔵 REFRESH SESSION (cookies only)
//
router.post('/auth/refresh', refreshUserSession);

//
// 🔴 LOGOUT
//
router.post('/auth/logout', authenticate, logoutUser);

export default router;
