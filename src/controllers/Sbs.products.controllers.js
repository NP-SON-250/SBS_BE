import Product from "../models/Sbs.products.model";
import * as prodService from "../services/Sbs.products.services";
import Stocks from "../models/Sbs.stock.model";
import { 
    validateCreateProduct,
    validateUpdateProduct,
 } from "../validation/Sbs.products.validation";

// controller to create a product
export const createProduct = async (req, res) => {
  const { error, value } = validateCreateProduct(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    // checking if product already exits
    const { prodName, prodFor } = req.body;
    const isProdExist = await Product.findOne({ prodName: prodName });

    if (isProdExist) {
      console.log(isProdExist);
      return res.status(403).json({
        status: "403",
        message: "Product already exists",
      });
    }
    const isStockExist = await Stocks.findOne({ stName: prodFor })
    if(!isStockExist){
      return res.status(404).json({
        status:"404",
        message:"Stock not found",
      });
    }
    const createdProduct = await prodService.createProd(
      value, req.file
    );
    return res.status(201).json({
      status: "201",
      message: "Product added to the stock",
      data: createdProduct,
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
// controller to update product
export const updateProduct = async (req, res) => {
  const { error, value } = validateUpdateProduct(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { id } = req.params;
    const findId = await Product.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Product not found",
      });
    }

    const { prodName } = req.body;
    const prodExist = await Product.findOne({ prodName });
    if (prodExist && prodExist._id.toString() !== id) {
      return res.status(403).json({
        status: "403",
        message: "Product already exists",
      });
    }

    const updatedProduct = await prodService.updateProd(id, value, req.file);
    return res.status(200).json({
      status: "200",
      message: "Product updated  ",
      data: updatedProduct,
    },{new:true});
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
// constroller to retrieve all products
export const getProducts = async (req, res) => {
  try {
    const products = await prodService.getSt();
    return res.status(200).json({
      status: "200",
      message: "Products retrieved",
      data: products,
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

// controller to retrieve single stoproductck
export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prodService.getOneSt(id);

    if (!product) {
      return res.status(404).json({
        status: "404",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Product retrieved",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};



// controller to delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await Product.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Product not found",
      });
    }
    await prodService.deleteProd(id);
    return res.status(200).json({
      status: "200",
      message: "Stock deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
