import { Request, Response } from "express";
import { ProductService } from "./products.service";
import { PaginationSchema } from "../../validators/pagination";
import { UpdateProductSchema } from "../../validators/product";
import { GetProductSchema } from "../../validators/get-product";
import { GetProduct } from "../../types/product";

export default class ProductController {
  static async getProducts(req: Request, res: Response) {
    try {
      const paginationResult = PaginationSchema.safeParse(req.query);
      if (!paginationResult.success) {
        res.status(400).send({
          message: "Invalid pagination parameters",
          errors: paginationResult.error.errors,
        });
        return;
      }

      const result = await ProductService.getProducts(paginationResult.data);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal error" });
      return;
    }
  }

  static async getProduct(req: Request, res: Response) {
    try {
      const validation = GetProductSchema.safeParse({
        id: parseInt(req.params.id),
      });
      if (!validation.success) {
        res.status(400).send({ message: validation.error });
        return;
      }

      const product = await ProductService.getProduct(validation.data.id);
      if (!product) {
        res.status(404).send({
          message: `Product ${validation.data.id} not found`,
        });
        return;
      }

      res.status(200).send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal error" });
      return;
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const productId: GetProduct = { id: parseInt(req.params.id) };
      const validation = UpdateProductSchema.safeParse(req.body);
      if (!validation.success) {
        res.status(400).send({ message: validation.error.message });
        return;
      }

      const product = await ProductService.getProduct(productId.id);

      if (!product) {
        res.status(404).send({ message: `Product ${productId.id} not found` });
        return;
      }
      console.log(validation.data);
      await ProductService.updateProduct(productId.id, {
        ...validation.data,
        updatedAt: new Date(),
      });

      const updatedProduct = await ProductService.getProduct(productId.id);

      if (!updatedProduct) {
        res.status(404).send({ message: `Product ${productId.id} not found` });
        return;
      }

      res.status(200).send(updatedProduct);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      res.status(500).send({ message: "Interal error" });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const productId: GetProduct = { id: parseInt(req.params.id) };
      const product = await ProductService.getProduct(productId.id);

      if (!product) {
        res.status(404).send({ message: `Product ${productId.id} not found` });
        return;
      }

      await ProductService.deleteProduct(productId.id);
      res.status(200).send({ message: `Product ${productId.id} deleted` });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      res.status(500).send({ message: "Interal error" });
    }
  }
}
