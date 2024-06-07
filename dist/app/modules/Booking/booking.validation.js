"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingUpdateValidationSchema = exports.bookingCreateValidationSchema = void 0;
const zod_1 = require("zod");
exports.bookingCreateValidationSchema = zod_1.z.object({
    flatId: zod_1.z.string({
        required_error: 'Flat ID is required',
        invalid_type_error: 'Flat ID must be a string',
    }),
});
exports.bookingUpdateValidationSchema = zod_1.z.object({
    status: zod_1.z.enum(['PENDING', 'BOOKED', 'REJECTED'], {
        required_error: 'Status is required',
        invalid_type_error: 'Status must be a string',
        message: 'Status must be one of PENDING, BOOKED, REJECTED',
    }),
});
