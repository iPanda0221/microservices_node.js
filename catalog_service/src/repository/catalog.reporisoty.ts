import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";
import { ProductFactory } from "../utils/fixtures";

export class CatalogRepository implements ICatalogRepository {
  async create(data: Product): Promise<Product> {
    // const product = ProductFactory.build();
    // return Promise.resolve(product);
    throw new Error("Method not implemented.");
  }
  async update(data: Product): Promise<Product> {
    // const product = ProductFactory.build();
    // return Promise.resolve(product);
    throw new Error("Method not implemented.");
  }
  async delete(id: any) {
    // const product = ProductFactory.build();
    // return Promise.resolve(product);
    throw new Error("Method not implemented.");
  }
  async find(limit: number, offset: number): Promise<Product[]> {
    // const products = ProductFactory.buildList(limit);
    // return Promise.resolve(products);
    throw new Error("Method not implemented.");
  }
  async findOne(id: number): Promise<Product> {
    // const product = ProductFactory.build();
    throw new Error("Method not implemented.");
    // return Promise.resolve(product);
  }
}
