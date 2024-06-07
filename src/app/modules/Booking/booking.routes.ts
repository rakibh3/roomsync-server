import express from 'express';
import auth from '../../middlewares/auth';
import { bookingController } from './booking.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  bookingCreateValidationSchema,
  bookingUpdateValidationSchema,
} from './booking.validation';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
  '/booking-applications',
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(bookingCreateValidationSchema),
  bookingController.createBooking
);
router.get(
  '/booking-requests',
  auth(UserRole.ADMIN, UserRole.USER),
  bookingController.getAllBookings
);
router.put(
  '/booking-requests/:bookingId',
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(bookingUpdateValidationSchema),
  bookingController.updateBookingById
);

export const bookingRouter = router;
