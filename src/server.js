import Express from "express";
import adminsRouter from "./routers/admins.js";
import categoriesRouter from "./routers/categories.js";
import deleteItemRouter from "./routers/deleteItems.js";
import productsRouter from "./routers/products.js";
import subCategoriesRouter from "./routers/subCategories.js";

const app = new Express();
app.use(Express.json());

app.use(adminsRouter);
app.use(categoriesRouter);
app.use(subCategoriesRouter);
app.use(productsRouter);
app.use(deleteItemRouter);

app.use(["*"], (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Not Foud",
  });
});
app.listen(5000, () => console.log("listening to 5000"));
