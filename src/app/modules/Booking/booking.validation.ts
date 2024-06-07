import { z } from 'zod';

export const bookingCreateValidationSchema = z.object({
  flatId: z.string({
    required_error: 'Flat ID is required',
    invalid_type_error: 'Flat ID must be a string',
  }),
});

export const bookingUpdateValidationSchema = z.object({
  status: z.enum(['PENDING', 'BOOKED', 'REJECTED'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string',
    message: 'Status must be one of PENDING, BOOKED, REJECTED',
  }),
});
