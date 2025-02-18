import Joi from "joi";

const createEmployeeSchema = Joi.object({
  firstName: Joi.string().required().min(3).max(30),
  lastName: Joi.string().required().min(3).max(30),
  telephone: Joi.string()
    .pattern(/^\+250\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Telephone must start with +250 and be followed by 9 digits.",
    }),
  idCard: Joi.string()
    .pattern(/^\d{16}$/)
    .required()
    .messages({
      "string.pattern.base": "ID Card must be exactly 16 digits.",
    }),
  workFor: Joi.string().required().messages({
    "any.required": "Business ID is required.",
  }),
  userProfile: Joi.string().optional(),
  userPassword: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  userRole: Joi.string()
    .valid("manager", "admin", "cashier", "owner", "server", "chef")
    .default("owner"),
});

export const validateCreateEmployee = (empData) => {
  return createEmployeeSchema.validate(empData);
};
const updateEmployeeSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).optional(),
    lastName: Joi.string().min(3).max(30).optional(),
    telephone: Joi.string()
      .pattern(/^\+250\d{9}$/)
      .optional()
      .messages({
        "string.pattern.base": "Telephone must start with +250 and be followed by 9 digits.",
      }),
    idCard: Joi.string()
      .pattern(/^\d{16}$/)
      .optional()
      .messages({
        "string.pattern.base": "ID Card must be exactly 16 digits.",
      }),
    userProfile: Joi.string().optional(),
    userEmail: Joi.string().email().optional(),
    userRole: Joi.string()
      .valid("manager", "admin", "cashier", "owner", "server", "chef")
      .optional(),
  });
  
  export const validateUpdateEmployee = (empData) => {
    return updateEmployeeSchema.validate(empData);
  };