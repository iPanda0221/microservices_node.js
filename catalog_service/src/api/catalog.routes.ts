import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

//endpoints
router.post("/product", (req: Request, res: Response) => {
  res.status(201).json({});
});

export default router;
