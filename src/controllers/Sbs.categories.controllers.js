import Categories from "../models/Sbs.categories.model";
import * as categoryService from "../services/Sbs.categories.services"
import { 
  validateCreateCategory,
  validateUpdateCategory
 } from "../validation/Sbs.categories.validate";

// controller to create a category
export const createCategory = async (req, res) => {
  const { error, value } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    // checking if category already exits
    const { catName } = req.body;
    const categoryExist = await Categories.findOne({ catName: catName });

    if (categoryExist) {
      console.log(categoryExist);
      return res.status(403).json({
        status: "403",
        message: "Category already exists",
      });
    }
    const category = await categoryService.createCat(
      value,
    );
    return res.status(201).json({
      status: "201",
      message: "Category added",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// constroller to retrieve all categories
export const getCategories = async (req, res) => {
  try {
    const category = await categoryService.getCat();
    return res.status(200).json({
      status: "200",
      message: "Categories retrieved",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// controller to retrieve single category by id
export const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getOneCat(id);

    if (!category) {
      return res.status(404).json({
        status: "404",
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Category retrieved",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// controller to update category by id
export const updateCategory = async (req, res) => {
  const { error, value } = validateUpdateCategory(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { id } = req.params;
    const findId = await Categories.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Category not found",
      });
    }
    // checking if category already exits
    const { catName } = req.body;
    const categoryExist = await Categories.findOne({ catName: catName });

    if (categoryExist._id != id) {
      return res.status(403).json({
        status: "403",
        message: "Category already exists",
      });
    }
    await categoryService.updateCategory(
      id,
      value,
    );
    return res.status(201).json({
      status: "201",
      message: "Category updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// controller to delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await Categories.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Category not found",
      });
    }
    await categoryService.deleteCategory(id);
    return res.status(200).json({
      status: "200",
      message: "Category deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
