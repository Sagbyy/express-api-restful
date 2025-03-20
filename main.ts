import express from "express";
import { PostgresDataSource } from "./db/database";
import productsRouter from "./routes/products/products.routes";

const app = async () => {
  const app = express();
  const port = 3000;
  app.use(express.json());

  try {
    await PostgresDataSource.initialize();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  app.use("/products", productsRouter);

  app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
  });
};

app();
