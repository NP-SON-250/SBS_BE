import Joi from "joi"

const createStockSchema = Joi.object({
    stName: Joi.string().required().min(3).max(30),
    descriptions: Joi.string().required().min(10).max(1000),
    stockFor: Joi.string().required(),
});

// Validation schema for updating a stock
const updateStockSchema = Joi.object({
    stName: Joi.string().required().min(3).max(30),
    descriptions: Joi.string().optional().min(10).max(1000),
}).or('stName', 'descriptions'); 

// Function to validate Stock creation
export const validateCreateStock = (stData) => {
  return createStockSchema.validate(stData);
};

// Function to validate Stock update
export const validateUpdateStock = (stData) => {
  return updateStockSchema.validate(stData);
};


