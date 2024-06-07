"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = void 0;
const zod_1 = require("zod");
const emailLoginSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: 'Email is required' }).email(),
    password: zod_1.z.string({ required_error: 'Password is required' }).min(6),
});
const usernameLoginSchema = zod_1.z.object({
    username: zod_1.z.string({ required_error: 'Username is required' }),
    password: zod_1.z.string({ required_error: 'Password is required' }).min(6),
});
const loginValidationSchema = zod_1.z.union([emailLoginSchema, usernameLoginSchema]);
const unknownSchema = loginValidationSchema;
const validatedLoginValidationSchema = unknownSchema;
exports.loginValidationSchema = validatedLoginValidationSchema;
