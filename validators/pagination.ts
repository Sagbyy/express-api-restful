import { z } from "zod";

export const PaginationSchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((n) => n > 0, "Page must be greater than 0"),
  limit: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((n) => n > 0 && n <= 100, "Limit must be between 1 and 100"),
});

export type PaginationQuery = z.infer<typeof PaginationSchema>;
