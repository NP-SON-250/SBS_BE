import Joi from "joi"

const createProductSchema = Joi.object({
    prodName: Joi.string().required().min(3).max(100),
    prodQuantity: Joi.string(),
    unitMeasure: Joi.string().required(),
    buyPrice: Joi.string(),
    salePrice: Joi.string(),
    status: Joi.string(),
    expDate: Joi.string(),
    prodFor: Joi.string().required(),
});

// Validation schema for updating a product
const updateProductSchema = Joi.object({
    prodName: Joi.string().required().min(3).max(30),
    prodQuantity: Joi.string().required().min(10).max(1000),
    unitMeasure: Joi.string().required(),
    buyPrice: Joi.string(),
    salePrice: Joi.string(),
    status: Joi.string().required(),
    expDate: Joi.string(),
}).or('prodName', 'prodQuantity','unitMeasure', 'buyPrice','salePrice', 'status'); 

// Function to validate product creation
export const validateCreateProduct = (prodData) => {
  return createProductSchema.validate(prodData);
};

// Function to validate Stock update
export const validateUpdateProduct = (prodData) => {
  return updateProductSchema.validate(prodData);
};


