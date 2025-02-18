import Joi from "joi"

const createBusinessSchema = Joi.object({
    bsName: Joi.string().required().min(3).max(30),
    bsCategory: Joi.string().required().min(3).max(30),
    bsProfile: Joi.string().optional(),
    userPassword: Joi.string().optional(),
    userEmail: Joi.string().optional(),
    
});
// Validation schema for updating a business
const updateBusinessSchema = Joi.object({
    bsName: Joi.string().optional(),
    bsCategory: Joi.string().optional(),
    bsProfile: Joi.string().optional(),
});

// Function to validate business creation
export const validateCreateBusiness = (busData) => {
  return createBusinessSchema.validate(busData);
};

// Function to validate business update
export const validateUpdateBusiness = (busData) => {
  return updateBusinessSchema.validate(busData);
};


