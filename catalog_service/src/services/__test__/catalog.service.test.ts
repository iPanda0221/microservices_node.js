import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog_repository";
import { ProductFactory } from "../../utils/fixtures";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";

const mockProcduct = (rest: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...rest,
  };
};

describe("catalogService", () => {
  let repository: ICatalogRepository;

  //setup dependencies
  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  //cleanup dependencies
  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });

  //run test
  describe("createProduct", () => {
    test("should create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProcduct({ price: +faker.commerce.price() });
      const result = await service.createProduct(reqBody);
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    test("should throw error with unable to create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProcduct({ price: faker.commerce.price() });

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));

      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "unable to create product"
      );
    });

    test("should throw error with product already exist", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProcduct({ price: faker.commerce.price() });

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product already exist"))
        );

      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "product already exist"
      );
    });
  });

  describe("updateProduct", () => {
    test("should update product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProcduct({
        price: +faker.commerce.price(),
        id: faker.number.int({ min: 10, max: 1000 }),
      });
      const result = await service.updateProduct(reqBody);
      expect(result).toMatchObject(reqBody);
    });

    test("should throw error with product doesn't exist", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProcduct({ price: faker.commerce.price() });

      jest
        .spyOn(repository, "update")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product doesn't exist"))
        );

      await expect(service.updateProduct(reqBody)).rejects.toThrow(
        "product doesn't exist"
      );
    });
  });

  describe("getProducts", () => {
    test("should get products by offset and limit", async () => {
      const service = new CatalogService(repository);
      const randomLimit = faker.number.int({ min: 10, max: 50 });
      const products = ProductFactory.buildList(randomLimit);
      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() => Promise.resolve(products));
      const result = await service.getProducts(randomLimit, 0);

      expect(result.length).toEqual(randomLimit);
      expect(result).toMatchObject(products);
    });

    test("should throw error with product doesn't exist", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProcduct({ price: faker.commerce.price() });

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product doesn't exist"))
        );

      await expect(service.getProducts(0, 0)).rejects.toThrow(
        "product doesn't exist"
      );
    });
  });

  describe("getProduct", () => {
    test("should get products by id", async () => {
      const service = new CatalogService(repository);
      const product = ProductFactory.build();
      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() => Promise.resolve(product));

      const result = await service.getProduct(product.id!);
      expect(result).toMatchObject(product);
    });
  });

  describe("deleteProduct", () => {
    test("should delete product by id", async () => {
      const service = new CatalogService(repository);
      const product = ProductFactory.build();
      jest
        .spyOn(repository, "delete")
        .mockImplementationOnce(() => Promise.resolve({ id: product.id }));

      const result = await service.deleteProduct(product.id!);
      expect(result).toMatchObject({
        id: product.id,
      });
    });

    test("should throw error with product doesn't exist", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProcduct({ price: faker.commerce.price() });

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product doesn't exist"))
        );

      await expect(service.getProducts(0, 0)).rejects.toThrow(
        "product doesn't exist"
      );
    });
  });
});
