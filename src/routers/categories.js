import { Router } from "express";
import {
  PUT_CATEGORIES,
  GET_CATEGORIES,
  POST_CATEGORIES,
} from "../controllers/categories.js";
import checkToken from "../midlware/checkToken.js";

const categoriesRouter = Router();
categoriesRouter.get(["/categories/:id", "/categories/"], GET_CATEGORIES);
categoriesRouter.post("/categories", checkToken, POST_CATEGORIES);
categoriesRouter.put("/categories/:id", checkToken, PUT_CATEGORIES);
export default categoriesRouter;
