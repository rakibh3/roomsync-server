"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/User/user.routes");
const flat_routes_1 = require("../modules/Flat/flat.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const booking_routes_1 = require("../modules/Booking/booking.routes");
const router = (0, express_1.Router)();
// Registering All Routes
router.use(user_routes_1.userRouter);
router.use(flat_routes_1.flatRouter);
router.use(auth_routes_1.authRouter);
router.use(booking_routes_1.bookingRouter);
exports.default = router;
