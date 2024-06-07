import { z } from 'zod';

export const userCreateValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  username: z.string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string',
  }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z
    .string({
      required_error:
        'Password is required & must be at least 6 characters long',
      invalid_type_error: 'Password must be a string',
    })
    .min(6)
    .max(255),
  profilePhoto: z.string().optional(),
});

export const userUpdateValidationSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
});

export const userManageValidationSchema = z.object({
  role: z
    .enum(['ADMIN', 'USER'], {
      required_error: 'Role is required',
      invalid_type_error: 'Role must be a string',
      message: 'Role must be one of ADMIN, USER',
    })
    .optional(),
  activeStatus: z
    .enum(['ACTIVE', 'INACTIVE'], {
      required_error: 'Active status is required',
      invalid_type_error: 'Active status must be a string',
      message: 'Active status must be one of ACTIVE, INACTIVE',
    })
    .optional(),
});
