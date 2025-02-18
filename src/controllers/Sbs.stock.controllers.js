import Businesses from "../models/Sbs.businesses.model";
import * as stockService from "../services/Sbs.stocks.services"
import Stocks from "../models/Sbs.stock.model";
import { 
    validateCreateStock,
    validateUpdateStock
 } from "../validation/Sbs.stocks.validation";

// controller to create a stock
export const createStock = async (req, res) => {
  const { error, value } = validateCreateStock(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    // checking if stock already exits
    const { stName, stockFor } = req.body;
    const stockExist = await Stocks.findOne({ stName: stName });

    if (stockExist) {
      console.log(stockExist);
      return res.status(403).json({
        status: "403",
        message: "Stock already exists",
      });
    }
    const isBusinessExist = await Businesses.findOne({ bsName: stockFor })
    if(!isBusinessExist){
      return res.status(404).json({
        status:"404",
        message:"Business not found",
      });
    }
    const stock = await stockService.createSt(
      value, req.file
    );
    return res.status(201).json({
      status: "201",
      message: "Stock recorded",
      data: stock,
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
// controller to update stock
export const updateStock = async (req, res) => {
  const { error, value } = validateUpdateStock(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { id } = req.params;
    const findId = await Stocks.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Stock not found",
      });
    }

    const { stName } = req.body;
    const stockExist = await Stocks.findOne({ stName });
    if (stockExist && stockExist._id.toString() !== id) {
      return res.status(403).json({
        status: "403",
        message: "Stock already exists",
      });
    }

    const updatedStock = await stockService.updateStock(id, value, req.file);
    return res.status(200).json({
      status: "200",
      message: "Stock updated  ",
      data: updatedStock,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
// constroller to retrieve all stocks
export const getStocks = async (req, res) => {
  try {
    const stocks = await stockService.getSt();
    return res.status(200).json({
      status: "200",
      message: "Stock retrieved",
      data: stocks,
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

// controller to retrieve single stock
export const getOneSt = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await stockService.getOneSt(id);

    if (!stock) {
      return res.status(404).json({
        status: "404",
        message: "Stock not found",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Stock retrieved",
      data: stock,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};



// controller to delete a stock
export const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await Stocks.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Stock not found",
      });
    }
    await stockService.deleteStock(id);
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
