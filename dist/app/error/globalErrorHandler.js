"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const zodError_1 = require("./zodError");
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (error, req, res, next) => {
    // Handle Zod Validation Error
    if (error instanceof zod_1.ZodError) {
        const result = (0, zodError_1.handleZodValidationError)(error);
        return res.status(result.statusCode).json({
            success: false,
            message: result.errorMessage,
            errorDetails: result.errorDetails,
        });
    }
    // Handle Duplicate Error
    if (error.code === 'P2002') {
        let message;
        const errorMessage = error.message;
        const regex = /Unique constraint failed on the fields: \(`(.+?)`\)/;
        const match = errorMessage.match(regex);
        if (match) {
            const constraintFields = match[1];
            message = `Duplicate error constraint failed on fields: ${constraintFields}`;
        }
        else {
            message = 'Failed to extract constraint details from error message';
        }
        return res.status(http_status_1.default.CONFLICT).json({
            success: false,
            message,
            errorDetails: error,
        });
    }
    // Handle other errors
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong!';
    return res.status(statusCode).json({
        success: false,
        message,
        errorDetails: error,
    });
};
exports.globalErrorHandler = globalErrorHandler;
