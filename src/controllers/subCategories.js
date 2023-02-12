import { read, write } from "../lib/models.js";

const GET_SUBCATEGORIES = (req, res) => {
  try {
    let subCategories = read("subCategories") || [];
    let products = read("products") || [];

    subCategories = subCategories.map((subCategory) => {
      subCategory.products = products.filter((product) => {
        if (subCategory.sub_category_id == product.sub_category_id) {
          return delete product.sub_category_id;
        }
      });
      return subCategory;
    });
    let id = req.params?.id;

    if (id) {
      subCategories = subCategories.find(
        (subCategory) => subCategory.sub_category_id == id
      );
      if (!subCategories) {
        throw new Error("no sub-category for this id");
      }
    }

    res.status(200).json(subCategories);
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

const POST_SUBCATEGORIES = (req, res) => {
  try {
    let subCategories = read("subCategories");
    let categories = read("categories");
    let { categoryId, subCategoryName } = req.body;

    if (!(categoryId && subCategoryName)) {
      throw new Error("category id or sub-category name not sent");
    }

    subCategories.forEach((subCat) => {
      if (subCat.sub_category_name == subCategoryName) {
        throw new Error("this sub-category exsist");
      }
    });
    let subCategory = categories.find((categ) => {
      return categ.category_id == categoryId;
    });
    if (!subCategory) {
      throw new Error("category for this id does not exist");
    }

    let sub_category_id = +subCategories.at(-1).sub_category_id + 1;

    subCategories.push({
      sub_category_id,
      category_id: +categoryId,
      sub_category_name: subCategoryName,
    });

    write("subCategories", subCategories);

    res.status(200).json({ status: 200, message: "sub-category added" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

const PUT_SUBCATEGORIES = (req, res) => {
  try {
    let { sub_category_name, category_id } = req.body;
    if (!(sub_category_name && category_id)) {
      throw new Error("sub_category_name or category_id not set");
    }
    let { id } = req.params;
    let subCategories = read("subCategories");

    let subCategoryIndex = subCategories.findIndex((subcat) => {
      return subcat.sub_category_id == id;
    });
    if (subCategoryIndex < 0) {
      throw new Error("wrong sub-category id");
    }
    if (
      subCategories[subCategoryIndex].sub_category_name == sub_category_name &&
      subCategories[subCategoryIndex].category_id == category_id
    ) {
      throw new Error("this sub-category already changed");
    }
    subCategories[subCategoryIndex] = {
      sub_category_id: +id,
      category_id,
      sub_category_name,
    };
    write("subCategories", subCategories);

    res.status(200).json({ status: 200, message: "sub-categories changed" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

export { GET_SUBCATEGORIES, POST_SUBCATEGORIES, PUT_SUBCATEGORIES };
