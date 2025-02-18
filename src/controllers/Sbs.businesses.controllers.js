import Businesses from "../models/Sbs.businesses.model";
import Categories from "../models/Sbs.categories.model";
import * as businessService from "../services/Sbs.business.services"
import Users from "../models/Sbs.users.model";
import { 
    validateCreateBusiness,
    validateUpdateBusiness
 } from "../validation/Sbs.businesses.validate";

// controller to create a business
export const createBusiness = async (req, res) => {
  const { error, value } = validateCreateBusiness(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    // checking if business already exits
    const { bsName, bsCategory, userEmail } = req.body;
    const businessExist = await Businesses.findOne({ bsName: bsName });

    if (businessExist) {
      console.log(businessExist);
      return res.status(403).json({
        status: "403",
        message: "Business already exists",
      });
    }
    const isCatExist = await Categories.findOne({ catName: bsCategory })
    if(!isCatExist){
      return res.status(404).json({
        status:"404",
        message:"Category not found",
      });
    }
    // Check if the userEmail already exists
    const existingUser = await Users.findOne({ userEmail });
    if (existingUser) {
      return res.status(409).json({
        status:"409",
        message:"Email already exists",
      });
    }
    const business = await businessService.createBus(
      value, req.file
    );
    return res.status(201).json({
      status: "201",
      message: "Business added",
      data: business,
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
// controller to update business
export const updateBusiness = async (req, res) => {
  const { error, value } = validateUpdateBusiness(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { id } = req.params;
    const findId = await Businesses.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Business not found",
      });
    }

    const { bsName } = req.body;
    const businessExist = await Businesses.findOne({ bsName });
    if (businessExist && businessExist._id.toString() !== id) {
      return res.status(403).json({
        status: "403",
        message: "Business already exists",
      });
    }

    const updatedBusiness = await businessService.updateBusiness(id, value, req.file);
    return res.status(200).json({
      status: "200",
      message: "Business updated  ",
      data: updatedBusiness,
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
// constroller to retrieve all busienesses
export const getBusinesses = async (req, res) => {
  try {
    const business = await businessService.getBus();
    return res.status(200).json({
      status: "200",
      message: "Businesses retrieved",
      data: business,
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

// controller to retrieve single business
export const getOnebusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const business = await businessService.getOneBus(id);

    if (!business) {
      return res.status(404).json({
        status: "404",
        message: "Business not found",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Business retrieved",
      data: business,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};



// controller to delete a business
export const deletebusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await Businesses.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Business not found",
      });
    }
    await businessService.deleteBusiness(id);
    return res.status(200).json({
      status: "200",
      message: "Business deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
