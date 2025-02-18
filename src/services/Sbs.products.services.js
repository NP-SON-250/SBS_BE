import Stocks from "../models/Sbs.stock.model";
import Product from "../models/Sbs.products.model";
import { uploadToCloud } from "../helper/cloud";

// service to create a product
export const createProd = async (prodData, file) => {
  const { 
    prodName, 
    prodQuantity,
    unitMeasure,
    buyPrice,
    salePrice,
    status,
    expDate,
    prodFor } = prodData;
  const isStockExist = await Stocks.findOne({ stName: prodFor })
    if(!isStockExist){
      return res.status(404).json({
        status:"404",
        message:"Stock not found",
      });
    }
// Upload the file (if provided) to the cloud
let result;
if (file) result = await uploadToCloud(file)
  return await Product.create({
    prodName,
    image: result?.secure_url,
    prodQuantity,
    unitMeasure,
    buyPrice,
    salePrice,
    expDate,
    status,
    stockFor:isStockExist._id,
  });
};

// service to retrieve all products
export const getProd = async () => {
  return await Product.find().populate('prodFor');
};

// service to retrieve a single product by id
export const getOneProd = async (id) => {
  return await Product.findById(id).populate('prodFor');
};

// service to updated product info by id
export const updateProd = async (id,prodData, file) => {
  const { 
    prodName,
    prodQuantity,
    unitMeasure,
    buyPrice,
    salePrice,
    expDate,
    status,
   } = prodData;
   // Upload the file (if provided) to the cloud
let result;
if (file) result = await uploadToCloud(file)
  return await Product.findByIdAndUpdate(id, {
    prodName,
    image: result?.secure_url,
    prodQuantity,
    unitMeasure,
    buyPrice,
    salePrice,
    expDate,
    status,
  },{ new: true });
};

// service to delete a product
export const deleteProd = async (id) => {
  await Product.findByIdAndDelete(id);
};
