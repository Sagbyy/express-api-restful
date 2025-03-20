import { z } from "zod";

export const GetProductSchema = z.object({
  id: z.number()
})