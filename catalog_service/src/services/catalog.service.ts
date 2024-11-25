import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {
  private _repo: ICatalogRepository;

  ConstructorParameters(repository: ICatalogRepository) {}

  createProduct(input: any) {}

  updateProduct(input: any) {}

  getProducts(limit: number, offset: number) {}

  getProduct(id: number) {}

  deleteProduct(id: number) {}
}
