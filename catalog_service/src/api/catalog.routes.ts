import express, { NextFunction, Request, Response } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.reporisoty";
import { RequestValidator } from "../utils/requestValidator";
import { createProductRequest } from "../dto/product.dto";

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

export default router;
