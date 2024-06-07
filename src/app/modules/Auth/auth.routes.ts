import express from 'express';
import { authController } from './auth.controller';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { loginValidationSchema } from './auth.validation';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  authController.loginUser
);

router.post('/refresh-token', authController.refreshToken);

router.post(
  '/change-password',
  auth(UserRole.ADMIN, UserRole.USER),
  authController.changePassword
);

export const authRouter = router;
