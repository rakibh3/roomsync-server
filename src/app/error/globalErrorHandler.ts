/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { handleZodValidationError } from './zodError';
import httpStatus from 'http-status';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  // Handle Zod Validation Error
  if (error instanceof ZodError) {
    const result = handleZodValidationError(error);

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
    } else {
      message = 'Failed to extract constraint details from error message';
    }

    return res.status(httpStatus.CONFLICT).json({
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
