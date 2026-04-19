import { Router } from 'express';

import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

import { updateUserAvatar } from '../controllers/userController.js';

const router = Router();

//
// 🖼️ UPDATE AVATAR
//
router.patch(
  '/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar
);

export default router;
