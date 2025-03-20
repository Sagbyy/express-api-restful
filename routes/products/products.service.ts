import { PostgresDataSource } from "../../db/database";
import { Product } from "../../db/models/product";
import { PaginationQuery } from "../../validators/pagination";
import { UpdateProduct } from "../../types/product";

export class ProductService {
  private static repository = PostgresDataSource.getRepository(Product);

  static async getProducts(pagination: PaginationQuery) {
    const { page, limit } = pagination;

    const [products, totalProducts] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      products,
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
      },
    };
  }

  static async getProduct(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  static async updateProduct(id: number, product: UpdateProduct) {
    return this.repository.update(id, product);
  }

  static async deleteProduct(id: number) {
    return this.repository.delete(id);
  }
}
