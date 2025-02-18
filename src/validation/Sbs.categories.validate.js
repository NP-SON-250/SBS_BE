import Joi from "joi"

const createCategorySchema = Joi.object({
    catName: Joi.string().required().min(3).max(30),
    catDescription: Joi.string().required().min(10).max(1000),
});

// Validation schema for updating a Category
const updateCategorySchema = Joi.object({
    catName: Joi.string().required().min(3).max(30),
    catDescription: Joi.string().optional().min(10).max(1000),
}).or('catName', 'catDescription'); 

// Function to validate Category creation
export const validateCreateCategory = (catData) => {
  return createCategorySchema.validate(catData);
};

// Function to validate Category update
export const validateUpdateCategory = (catData) => {
  return updateCategorySchema.validate(catData);
};


