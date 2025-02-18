import Joi from "joi"

// Validation schema for user login
const loginUserSchema = Joi.object({
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().required(),
  });

// Function to validate user login
export const validateLoginUser = (userData) => {
    return loginUserSchema.validate(userData);
  };
// Validation schema for user update
  const updateUserSchema = Joi.object({
    userEmail: Joi.string().email().optional(),
    userPassword: Joi.string().optional(),
    userProfile: Joi.string().optional(),
    userRole: Joi.string().valid("manager", "admin", "cashier", "owner", "server", "chef").optional(),
  });
  // Function to validate user update
  export const validateUpdateUser = (userData) => {
    return updateUserSchema.validate(userData);
  };