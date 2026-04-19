import express from 'express';
import { updateUserAvatar } from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.patch('/me/avatar', auth, upload.single('avatar'), updateUserAvatar);

export default router;
