import { Router } from "express";
import {
  GET_SUBCATEGORIES,
  POST_SUBCATEGORIES,
  PUT_SUBCATEGORIES,
} from "../controllers/subCategories.js";
import checkToken from "../midlware/checkToken.js";

const subCategoriesRouter = Router();
subCategoriesRouter.get(
  ["/subcategories/:id", "/subcategories"],
  GET_SUBCATEGORIES
);
subCategoriesRouter.post("/subcategories", checkToken, POST_SUBCATEGORIES);
subCategoriesRouter.put("/subcategories/:id", checkToken, PUT_SUBCATEGORIES);

export default subCategoriesRouter;
