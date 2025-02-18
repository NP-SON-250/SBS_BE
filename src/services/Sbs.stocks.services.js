import Stocks from "../models/Sbs.stock.model";
import Businesses from "../models/Sbs.businesses.model";

// service to create a stock
export const createSt = async (stData) => {
  const { stName, descriptions, stockFor } = stData;
  const isBusinessExist = await Businesses.findOne({ bsName: stockFor })
    if(!isBusinessExist){
      return res.status(404).json({
        status:"404",
        message:"Business not found",
      });
    }

  return await Stocks.create({
    stName,
    descriptions,
    stockFor:isBusinessExist._id,
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
