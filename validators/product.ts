import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string().min(2),
  price: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UpdateProductSchema = z
  .object({
    name: z.string().min(2),
    price: z.string().min(1),
  })
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
