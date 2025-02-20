import Stocks from "../models/Sbs.stock.model";
import Businesses from "../models/Sbs.businesses.model";

// Service to create a stock
export const createSt = async (stData) => {
  const { stName, descriptions, stockFor } = stData;

  // Check if business exists
  const isBusinessExist = await Businesses.findOne({ bsName: stockFor });
  if (!isBusinessExist) {
    throw new Error("Business not found");
  }

  // Check if stock already exists for the same business
  const stockExist = await Stocks.findOne({ stName, stockFor: isBusinessExist._id });

  if (stockExist) {
    throw new Error("Stock already exists for this business");
  }

  // Create new stock
  return await Stocks.create({
    stName,
    descriptions,
    stockFor: isBusinessExist._id,
  });
};

// service to retrieve all stock
export const getSt = async () => {
  return await Stocks.find().populate('stockFor');
};

// service to retrieve a single stock by id
export const getOneSt = async (id) => {
  return await Stocks.findById(id).populate('stockFor');
};

// service to updated stock info by id
export const updateStock = async (id, stData) => {
  const { stName, descriptions } = stData;
  return await Stocks.findByIdAndUpdate(id, {
    stName,
    descriptions,
  },{ new: true });
};

// service to delete a stock
export const deleteStock = async (id) => {
  await Stocks.findByIdAndDelete(id);
};
