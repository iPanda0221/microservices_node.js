import express, { NextFunction, Request, Response } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.reporisoty";
import { RequestValidator } from "../utils/requestValidator";
import { createProductRequest, UpdateProductRequest } from "../dto/product.dto";

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

//endpoints
router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        createProductRequest,
        req.body
      );

      if (errors) return next(res.status(400).json(errors));
      const data = await catalogService.createProduct(input);

      return next(res.status(201).json(data));
    } catch (error) {
      const err = error as Error;
      return next(res.status(500).json(err.message));
    }
  }
);

router.patch(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        UpdateProductRequest,
        req.body
      );

      const id = parseInt(req.params.id) || 0;

      if (errors) return next(res.status(400).json(errors));
      const data = await catalogService.updateProduct({ id, ...input });

      return next(res.status(200).json(data));
    } catch (error) {
      const err = error as Error;
      return next(res.status(500).json(err.message));
    }
  }
);

router.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query["limit"]);
    const offset = Number(req.query["offset"]);
    try {
      const data = await catalogService.getProducts(limit, offset);

      return next(res.status(200).json(data));
    } catch (error) {
      const err = error as Error;
      return next(res.status(500).json(err.message));
    }
  }
);

router.get(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {
      const data = await catalogService.getProduct(id);

      return next(res.status(200).json(data));
    } catch (error) {
      const err = error as Error;
      return next(res.status(500).json(err.message));
    }
  }
);

router.delete(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {
      const data = await catalogService.deleteProduct(id);

      return next(res.status(200).json(data));
    } catch (error) {
      const err = error as Error;
      return next(res.status(500).json(err.message));
    }
  }
);

export default router;
