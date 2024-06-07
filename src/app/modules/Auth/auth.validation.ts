import { z } from 'zod';

const emailLoginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string({ required_error: 'Password is required' }).min(6),
});

const usernameLoginSchema = z.object({
  username: z.string({ required_error: 'Username is required' }),
  password: z.string({ required_error: 'Password is required' }).min(6),
});

const loginValidationSchema = z.union([emailLoginSchema, usernameLoginSchema]);

const unknownSchema: unknown = loginValidationSchema;

const validatedLoginValidationSchema = unknownSchema as z.AnyZodObject;

export { validatedLoginValidationSchema as loginValidationSchema };
