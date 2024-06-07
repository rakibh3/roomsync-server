import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  userCreateValidationSchema,
  userManageValidationSchema,
  userUpdateValidationSchema,
} from './user.validation';
import { UserRole } from '@prisma/client';

const router = express.Router();

// Create user profile
router.post(
  '/register',
  validateRequest(userCreateValidationSchema),
  userController.createUser
);

// Get user profile based on logged in user
router.get(
  '/my-profile',
  auth(UserRole.ADMIN, UserRole.USER),
  userController.getUserProfile
);

// Update user email/username based on logged in user
router.put(
  '/my-profile',
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(userUpdateValidationSchema),
  userController.updateUserProfile
);

// Manage user role and status based on user id ADMIN only
router.put(
  '/manager-user/:userId',
  auth(UserRole.ADMIN),
  validateRequest(userManageValidationSchema),
  userController.managerUser
);

// Get all users ADMIN only
router.get('/all-users', auth(UserRole.ADMIN), userController.getAllUsers);

export const userRouter = router;
