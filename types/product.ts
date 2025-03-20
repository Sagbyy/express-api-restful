import { z } from "zod";
import { ProductSchema, UpdateProductSchema } from "../validators/product";

export interface GetProduct {
  id: number;
}

export type ProductType = z.infer<typeof ProductSchema>;

export type UpdateProduct = z.infer<typeof UpdateProductSchema> & {
  updatedAt: Date;
}
