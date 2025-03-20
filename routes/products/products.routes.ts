import { Router } from "express";
import ProductController from "./products.controller";

const router = Router();

router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProduct);
router.patch("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;
