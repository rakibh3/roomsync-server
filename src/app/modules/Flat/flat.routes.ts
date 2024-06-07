import express, { NextFunction, Request, Response } from 'express';
import { flatController } from './flat.controller';
import { validateRequest } from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import {
  flatCreateValidationSchema,
  flatUpdateValidationSchema,
} from './flat.validation';
import { UserRole } from '@prisma/client';

const router = express.Router();

// Create flat
router.post(
  '/flats',
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(flatCreateValidationSchema),
  flatController.createFlat
);

router.get('/flats', flatController.getAllFlats);

router.get(
  '/my-flats',
  auth(UserRole.USER),
  flatController.getFlatsCreatedByUser
);

router.put(
  '/flats/:flatId',
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(flatUpdateValidationSchema),
  flatController.updateFlatById
);

router.delete(
  '/flats/:flatId',
  auth(UserRole.USER, UserRole.ADMIN),
  flatController.deleteFlatById
);

router.get('/flat/:flatId', flatController.getFlatById);

export const flatRouter = router;
