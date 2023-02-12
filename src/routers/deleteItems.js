import { Router } from "express";
import deleteControler from "../controllers/deleteControler.js";

const deleteItemRouter = Router();

deleteItemRouter.delete(
  "/categories/:id",
  deleteControler("categories", "category_id")
);
deleteItemRouter.delete(
  "/subcategories/:id",
  deleteControler("subcategories", "sub_category_id")
);
deleteItemRouter.delete(
  "/products/:id",
  deleteControler("products", "product_id")
);

export default deleteItemRouter;
