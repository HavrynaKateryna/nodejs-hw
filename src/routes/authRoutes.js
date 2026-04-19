import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';

const router = Router();

//
// 🟢 REGISTER
//
router.post('/register', celebrate({ body: registerUserSchema }), registerUser);

//
// 🟡 LOGIN
//
router.post('/login', celebrate({ body: loginUserSchema }), loginUser);

//
// 🔵 REFRESH
//
router.post('/refresh', refreshUserSession);

//
// 🔴 LOGOUT
//
router.post('/logout', logoutUser);

//
// 📧 REQUEST RESET EMAIL
//
router.post(
  '/request-reset-email',
  celebrate({ body: requestResetEmailSchema }),
  requestResetEmail
);

//
// 🔑 RESET PASSWORD
//
router.post(
  '/reset-password',
  celebrate({ body: resetPasswordSchema }),
  resetPassword
);

export default router;
