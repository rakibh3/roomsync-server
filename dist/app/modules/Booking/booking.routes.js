"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const booking_controller_1 = require("./booking.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const booking_validation_1 = require("./booking.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/booking-applications', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.validateRequest)(booking_validation_1.bookingCreateValidationSchema), booking_controller_1.bookingController.createBooking);
router.get('/booking-requests', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), booking_controller_1.bookingController.getAllBookings);
router.put('/booking-requests/:bookingId', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.validateRequest)(booking_validation_1.bookingUpdateValidationSchema), booking_controller_1.bookingController.updateBookingById);
exports.bookingRouter = router;
