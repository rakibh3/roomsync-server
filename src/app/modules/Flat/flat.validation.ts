import { z } from 'zod';

export const flatCreateValidationSchema = z.object({
  location: z.string({
    required_error: 'Location is required',
    invalid_type_error: 'Location must be a string',
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }),
  rent: z
    .number({ required_error: 'Rent is required' })
    .int()
    .min(1, { message: 'Rent must be a positive integer' }),
  totalBedrooms: z
    .number({ required_error: 'Total bedrooms is required' })
    .int()
    .min(1, { message: 'Total bedrooms must be a positive integer' }),
  amenities: z.array(
    z.string({
      required_error: 'Amenities is required',
      invalid_type_error: 'Amenities must be a string',
    })
  ),
  flatPhotos: z.string({
    required_error: 'Flat photos is required',
    invalid_type_error: 'Flat photos must be a string',
  }),
  squareFeet: z
    .number({
      required_error: 'Square feet is required',
    })
    .int()
    .min(1, { message: 'Square feet must be a positive integer' }),

  totalRooms: z
    .number({ required_error: 'Total rooms is required' })
    .int()
    .min(1, { message: 'Total rooms must be a positive integer' }),

  availability: z.boolean().default(true),
});

export const flatUpdateValidationSchema = z.object({
  squareFeet: z.number().int().min(1).optional(),
  totalBedrooms: z.number().int().min(1).optional(),
  totalRooms: z.number().int().min(1).optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  rent: z.number().int().min(1).optional(),
  availability: z.boolean().default(true),
});
