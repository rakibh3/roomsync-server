"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatUpdateValidationSchema = exports.flatCreateValidationSchema = void 0;
const zod_1 = require("zod");
exports.flatCreateValidationSchema = zod_1.z.object({
    location: zod_1.z.string({
        required_error: 'Location is required',
        invalid_type_error: 'Location must be a string',
    }),
    description: zod_1.z.string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string',
    }),
    rent: zod_1.z
        .number({ required_error: 'Rent is required' })
        .int()
        .min(1, { message: 'Rent must be a positive integer' }),
    totalBedrooms: zod_1.z
        .number({ required_error: 'Total bedrooms is required' })
        .int()
        .min(1, { message: 'Total bedrooms must be a positive integer' }),
    amenities: zod_1.z.array(zod_1.z.string({
        required_error: 'Amenities is required',
        invalid_type_error: 'Amenities must be a string',
    })),
    flatPhotos: zod_1.z.string({
        required_error: 'Flat photos is required',
        invalid_type_error: 'Flat photos must be a string',
    }),
    squareFeet: zod_1.z
        .number({
        required_error: 'Square feet is required',
    })
        .int()
        .min(1, { message: 'Square feet must be a positive integer' }),
    totalRooms: zod_1.z
        .number({ required_error: 'Total rooms is required' })
        .int()
        .min(1, { message: 'Total rooms must be a positive integer' }),
    utilitiesDescription: zod_1.z.string({
        required_error: 'Utilities description is required',
        invalid_type_error: 'Utilities description must be a string',
    }),
    availability: zod_1.z.boolean().default(true),
    advanceAmount: zod_1.z
        .number({
        required_error: 'Advance amount is required',
    })
        .int()
        .min(0, { message: 'Advance amount must be a positive integer' }),
});
exports.flatUpdateValidationSchema = zod_1.z.object({
    squareFeet: zod_1.z.number().int().min(1).optional(),
    totalBedrooms: zod_1.z.number().int().min(1).optional(),
    totalRooms: zod_1.z.number().int().min(1).optional(),
    utilitiesDescription: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    rent: zod_1.z.number().int().min(1).optional(),
    availability: zod_1.z.boolean().default(true),
    advanceAmount: zod_1.z.number().int().min(1).optional(),
});
