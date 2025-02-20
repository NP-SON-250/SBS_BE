import express from "express";
import { format } from "path";
import { serve, setup } from "swagger-ui-express";

const docrouter = express.Router();

const options = {
  openapi: "3.0.1",
  info: {
    title: "Alema Soft SBS API",
    version: "1.0.0",
    description: "Documentation for Alema Soft SBS API.",
  },
  basePath: "/",
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT", 
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    {
      name: "Categories",
      description: "Operations related to categories entities",
    },
    {
      name: "Businesses",
      description: "Operations related to Businesses entities",
    },
    {
      name: "Stocks",
      description: "Operations related to Stocks entities",
    },
    {
      name: "Products",
      description: "Operations related to Products entities",
    },
    {
      name: "Users",
      description: "Operations related to Users entities",
    },
    {
      name: "Employees",
      description: "Operations related to Employees entities",
    },
  ],
  paths: {
    // Categories

        "/api/v1/categories": {
      get: {
        tags: ["Categories"],
        summary: "All Categories",
        description: "Get all Categories",
        responses: {
          200: {
            description: "All Categories are retrieved",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["Categories"],
        summary: "Create Categories",
        description: "Create new categories",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  catName: {
                    type: "string",
                  },
                  catDescription: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New Category added",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/categories/{id}": {
      get: {
        tags: ["Categories"],
        summary: "Read Category By ID",
        description: "Get a Category by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Category retrieved",
          },
          404: {
            description: "Category not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Categories"],
        summary: "Update Category",
        description: "Update an existing Category",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  catName: {
                    type: "string",
                  },
                  catDescription: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Category updated",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Category not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Categories"],
        summary: "Delete Category",
        description: "Delete a Category",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Category deleted",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Category not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    //Businesses
    "/api/v1/businesses": {
      get: {
        tags: ["Businesses"],
        summary: "All businesses",
        description: "Get all businesses",
        responses: {
          200: {
            description: "All businesses are retrieved",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["Businesses"],
        summary: "Create business",
        description: "Create new business",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  bsName: {
                    type: "string",
                  },
                  bsCategory: {
                    type: "string",
                  },
                  userEmail: {
                    type: "string",
                  },
                  userPassword: {
                    type: "string",
                  },
                  bsProfile: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New business added",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/businesses/{id}": {
      get: {
        tags: ["Businesses"],
        summary: "Read business By ID",
        description: "Get a business by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Business retrieved",
          },
          404: {
            description: "Business not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Businesses"],
        summary: "Update business",
        description: "Update an existing business",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  bsName: {
                    type: "string",
                  },
                  bsCategory: {
                    type: "string",
                  },
                  bsProfile: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Business updated",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Business not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Businesses"],
        summary: "Delete business",
        description: "Delete a business",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Business deleted",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Business not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    //Stock
    "/api/v1/stocks": {
      get: {
        tags: ["Stocks"],
        summary: "All stocks",
        description: "Get all stocks",
        responses: {
          200: {
            description: "All stocks are retrieved",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["Stocks"],
        summary: "Create stock",
        description: "Create new stock",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  stName: {
                    type: "string",
                  },
                  descriptions: {
                    type: "string",
                  },
                  stockFor: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New stock added",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/stocks/{id}": {
      get: {
        tags: ["Stocks"],
        summary: "Read stock By ID",
        description: "Get a stock by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Stock retrieved",
          },
          404: {
            description: "Stock not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Stocks"],
        summary: "Update stocks",
        description: "Update an existing stock",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  stName: {
                    type: "string",
                  },
                  descriptions: {
                    type: "string",
                  },
                  
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Stock updated",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Stock not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Stocks"],
        summary: "Delete stock",
        description: "Delete a stock",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Stock deleted",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Stock not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    //Products
    "/api/v1/products": {
      get: {
        tags: ["Products"],
        summary: "All products",
        description: "Get all products",
        responses: {
          200: {
            description: "All products are retrieved",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["Products"],
        summary: "Create product",
        description: "Create new product",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  prodName: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                    format:"binary",
                  },
                  prodQuantity: {
                    type: "string",
                  },
                  unitMeasure: {
                    type: "string",
                  },
                  buyPrice: {
                    type: "string",
                  },
                  salePrice: {
                    type: "string",
                  },
                  expDate: {
                    type: "string",
                    format: "date",
                  },
                  prodFor: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New product added",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/products/{id}": {
      get: {
        tags: ["Products"],
        summary: "Read product By ID",
        description: "Get a product by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Product retrieved",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Products"],
        summary: "Update products",
        description: "Update an existing product informations",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  prodName: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                    format:"binary",
                  },
                  prodQuantity: {
                    type: "string",
                  },
                  unitMeasure: {
                    type: "string",
                  },
                  buyPrice: {
                    type: "string",
                  },
                  salePrice: {
                    type: "string",
                  },
                  expDate: {
                    type: "string",
                    format: "date",
                  },
                  
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Product updated",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Products"],
        summary: "Delete product",
        description: "Delete a product",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Product deleted",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    //User login 
    "/api/v1/users/auth": {
      post: {
        tags: ["Users"],
        summary: "User Login",
        description: "User login",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  userEmail: {
                    type: "string",
                  },

                  userPassword: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "You loggedIn",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Read User By ID",
        description: "Get a user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User retrieved",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Users"],
        summary: "Update user",
        description: "Update an existing user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  userEmail: {
                    type: "string",
                  },
                  userPassword: {
                    type: "string",
                  },
                  userProfile: {
                    type: "string",
                    format:"binary",
                  },
                  userRole: {
                    type: "string",
                    enum: ["manager", "admin","cashier", "owner","server", "chef"],
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User updated",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Delete user",
        description: "Delete a user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Users deleted",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/users": {
    get: {
      tags: ["Users"],
      summary: "All users",
      description: "Get all users",
      responses: {
        200: {
          description: "All users are retrieved",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    }}, 
    // Employees
    "/api/v1/employees": {
      get: {
        tags: ["Employees"],
        summary: "All employees",
        description: "Get all employees",
        responses: {
          200: {
            description: "All employees are retrieved",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["Employees"],
        summary: "Create employee",
        description: "Create new employee",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  firstName: {
                    type: "string",
                  },
                  lastName: {
                    type: "string",
                  },
                  telephone: {
                    type: "string",
                  },
                  idCard: {
                    type: "string",
                  },
                  userEmail:{
                    type: "string",
                  },
                  userPassword: {
                    type: "string",
                  },
                  userProfile:{
                    type: "string",
                    format: "binary",
                  },
                  workFor:{
                    type: "string",
                  },
                  userRole:{
                    type: "string",
                    enum: ["manager", "admin","cashier", "owner","server", "chef"],
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New employee added",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/employees/{id}": {
      get: {
        tags: ["Employees"],
        summary: "Read employee By ID",
        description: "Get a employee by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Employee retrieved",
          },
          404: {
            description: "Employee not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Employees"],
        summary: "Update employee",
        description: "Update an existing employee",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  firstName: {
                    type: "string",
                  },
                  lastName: {
                    type: "string",
                  },
                  telephone: {
                    type: "string",
                  },
                  idCard: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Employee updated",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Employee not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Employees"],
        summary: "Delete employee",
        description: "Delete an employee",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Employee deleted",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Employee not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    //Others
  },
},
}



docrouter.use("/", serve, setup(options));

export default docrouter;
