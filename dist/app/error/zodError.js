"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodValidationError = void 0;
const handleZodValidationError = (error) => {
    const statusCode = 400;
    const message = 'Validation Error';
    const capitalizeFirstLetter = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };
    const errorMessages = error.issues.map((issue) => {
        const path = issue.path.length > 0 ? issue.path[issue.path.length - 1] : '';
        return {
            path: capitalizeFirstLetter(path),
            message: capitalizeFirstLetter(issue.message),
        };
    });
    const errorMessage = errorMessages
        .map((error) => `${error.path} ${error.message}`)
        .join('. ');
    return {
        statusCode,
        errorMessage,
        errorDetails: {
            issues: errorMessages,
        },
    };
};
exports.handleZodValidationError = handleZodValidationError;
