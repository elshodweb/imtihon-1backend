import { Router } from "express";
import {
  GET_PRODUCTS,
  POST_PRODUCTS,
  PUT_PRODUCTS,
} from "../controllers/products.js";
import checkToken from "../midlware/checkToken.js";

const productsRouter = Router();

productsRouter.get(["/products", "/products/:id"], GET_PRODUCTS);
productsRouter.post("/products", checkToken, POST_PRODUCTS);
productsRouter.put("/products/:id", checkToken, PUT_PRODUCTS);

export default productsRouter;
