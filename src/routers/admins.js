import { Router } from "express";
import { LOGIN_ADMIN } from "../controllers/admins.js";

const adminsRouter = Router();

adminsRouter.post("/admin/login",LOGIN_ADMIN);

export default adminsRouter;
