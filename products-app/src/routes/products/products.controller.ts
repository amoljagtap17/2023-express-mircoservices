import express, { NextFunction, Request, Response } from "express";
import { validateRequest } from "../../middleware/validate-request";
import { IProductDTO } from "./dtos/products.dto";
import { ProductsService } from "./products.service";
import { productsValidators } from "./validators/products.validators";

const productsController = express.Router({ caseSensitive: true });

productsController
  .route("/")
  .all((_req: Request, _res: Response, next: NextFunction) => {
    next();
  })
  .get(async (_req: Request, res: Response, _next: NextFunction) => {
    const products = await ProductsService.getProducts();

    res.json(products);
  })
  .post(
    productsValidators,
    validateRequest,
    async (req: Request, res: Response, _next: NextFunction) => {
      const body = req.body as IProductDTO;

      const newProduct = await ProductsService.addProducts(body);

      res.json(newProduct);
    }
  );

productsController.route("/:id").get(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await ProductsService.getProduct(id);

  res.json(product);
});

export { productsController };
