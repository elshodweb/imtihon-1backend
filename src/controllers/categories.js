import { read, write } from "../lib/models.js";

const GET_CATEGORIES = (req, res) => {
  try {
    let categories = read("categories") || [];
    let subCategories = read("subCategories") || [];

    categories = categories.map((category) => {
      category.subCategories = subCategories.filter((subCategory) => {
        if (category.category_id == subCategory.category_id) {
          return delete subCategory.category_id;
        }
      });
      return category;
    });
    let id = req.params?.id;

    if (id) {
      categories = categories.find((category) => category.category_id == id);
      if (!categories) {
        throw new Error("no category for this id");
      }
    }

    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

const POST_CATEGORIES = (req, res) => {
  try {
    let categories = read("categories");
    let { categoryName } = req.body;

    if (!categoryName) {
      throw new Error("category name not sent");
    }

    let category = categories.find((cat) => cat.category_name == categoryName);

    if (category) {
      throw new Error("this category exsist");
    }

    let category_id = +categories.at(-1).category_id + 1;

    categories.push({ category_id, category_name: categoryName });
    write("categories", categories);
    res.status(200).json({ status: 200, message: "category added" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

const PUT_CATEGORIES = (req, res) => {
  try {
    let { category_name } = req.body;
    if(!category_name){
      throw new Error("category_name not set")
    }
    let { id } = req.params;
    let categories = read("categories");

    let categoryIndex = categories.findIndex((cat) => {
      return cat.category_id == id;
    });

    if (categoryIndex<0) {
      throw new Error("wrong id");
    }

    if (categories[categoryIndex].category_name == category_name) {
      throw new Error("this name already changed");
    }

    categories[categoryIndex].category_name = category_name;
    write("categories", categories);

    res.status(200).json({ status: 200, message: "category changed" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

export { GET_CATEGORIES, POST_CATEGORIES, PUT_CATEGORIES };
