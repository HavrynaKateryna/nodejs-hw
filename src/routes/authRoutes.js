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
// 🔵 REFRESH
//
router.post('/auth/refresh', refreshUserSession);

//
// 🔴 LOGOUT (БЕЗ authenticate ❗)
//
router.post('/auth/logout', logoutUser);

export default router;
