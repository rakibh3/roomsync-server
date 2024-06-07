"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userManageValidationSchema = exports.userUpdateValidationSchema = exports.userCreateValidationSchema = void 0;
const zod_1 = require("zod");
exports.userCreateValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    }),
    username: zod_1.z.string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string',
    }),
    email: zod_1.z
        .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    })
        .email(),
    password: zod_1.z
        .string({
        required_error: 'Password is required & must be at least 6 characters long',
        invalid_type_error: 'Password must be a string',
    })
        .min(6)
        .max(255),
    profilePhoto: zod_1.z.string().optional(),
});
exports.userUpdateValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    username: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
});
exports.userManageValidationSchema = zod_1.z.object({
    role: zod_1.z
        .enum(['ADMIN', 'USER'], {
        required_error: 'Role is required',
        invalid_type_error: 'Role must be a string',
        message: 'Role must be one of ADMIN, USER',
    })
        .optional(),
    activeStatus: zod_1.z
        .enum(['ACTIVE', 'INACTIVE'], {
        required_error: 'Active status is required',
        invalid_type_error: 'Active status must be a string',
        message: 'Active status must be one of ACTIVE, INACTIVE',
    })
        .optional(),
});
