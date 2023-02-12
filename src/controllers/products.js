import { read, write } from "../lib/models.js";

const GET_PRODUCTS = (req, res) => {
  try {
    let { id } = req.params;
    let { categoryId, subCategoryId, model } = req.query;
    let products = read("products");
    if (id) {
      products = products.find((product) => product.product_id == id);
    } else if (categoryId || subCategoryId || model) {
      let subCategories = read("subCategories");
      products = products.filter((product) => {
        let byCategoryId = true;
        if (categoryId) {
          let subCategory = subCategories.find((subCat) => {
            return subCat.sub_category_id == product.sub_category_id;
          });

          product.category_id = subCategory.category_id;

          byCategoryId = categoryId ? product.category_id == categoryId : true;
        }

        let bySubCategoryId = subCategoryId
          ? product.sub_category_id == subCategoryId
          : true;

        let byModel = model ? product.model == model : true;

        return byCategoryId && bySubCategoryId && byModel;
      });
    } else {
      products = [];
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

let POST_PRODUCTS = (req, res) => {
  try {
    let products = read("products");
    let subCategories = read("subCategories");
    let { subCategoryId, productName, price, color, model } = req.body;

    if (!(subCategoryId && productName && price && color && model)) {
      throw new Error("incomplete information");
    }

    products.forEach((product) => {
      if (
        product.sub_category_id == subCategoryId &&
        product.product_name == productName &&
        product.price == price &&
        product.color == color &&
        product.model == model
      ) {
        throw new Error("this product exsist");
      }
    });

    let product = subCategories.find((subcat) => {
      return subcat.sub_category_id == subCategoryId;
    });
    if (!product) {
      throw new Error("sub-category for this id does not exist");
    }

    let product_id = +products.at(-1).product_id + 1;

    products.push({
      product_id,
      sub_category_id: subCategoryId,
      model,
      product_name: productName,
      color,
      price,
    });

    write("products", products);

    res.status(200).json({ status: 200, message: "products added" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

const PUT_PRODUCTS = (req, res) => {
  try {
    let { sub_category_id, product_name, price, color, model } = req.body;
    if (!(sub_category_id && product_name && price && color && model)) {
      throw new Error("data is incomplete");
    }
    let { id } = req.params;
    let products = read("products");

    let productIndex = products.findIndex((product) => {
      return product.product_id == id;
    });
    if (productIndex < 0) {
      throw new Error("wrong product id");
    }
    if (
      products[productIndex].sub_category_id == sub_category_id &&
      products[productIndex].product_name == product_name &&
      products[productIndex].price == price &&
      products[productIndex].color == color &&
      products[productIndex].model == model
    ) {
      throw new Error("this product already changed");
    }
    products[productIndex] = {
      product_id: +id,
      sub_category_id,
      model,
      product_name,
      color,
      price,
    };
    write("products", products);

    res.status(200).json({ status: 200, message: "products changed" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

export { GET_PRODUCTS, POST_PRODUCTS, PUT_PRODUCTS };
