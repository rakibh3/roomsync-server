import { Router } from 'express';
import { userRouter } from '../modules/User/user.routes';
import { flatRouter } from '../modules/Flat/flat.routes';
import { authRouter } from '../modules/Auth/auth.routes';
import { bookingRouter } from '../modules/Booking/booking.routes';

const router = Router();

// Registering All Routes
router.use(userRouter);
router.use(flatRouter);
router.use(authRouter);
router.use(bookingRouter);

export default router;
