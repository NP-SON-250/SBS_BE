import Businesses from "../models/Sbs.businesses.model";
import Employees from "../models/Sbs.employees.model";
import Users from "../models/Sbs.users.model";
import { uploadToCloud } from "../helper/cloud";
import bcrypt from "bcrypt";

// Service to create a business
export const createEmp = async (empData, file) => {
  const { firstName, lastName, telephone, idCard, userPassword, userEmail, userRole, workFor } = empData;

  try {
    // Validate the business existence using bsName
    const business = await Businesses.findOne({ bsName:workFor });
    if (!business) {
      throw new Error("Business not found");
    }

    // Upload the profile image to the cloud (if provided)
    let profileUrl = null;
    if (file) {
      const result = await uploadToCloud(file);
      profileUrl = result.secure_url;
    }

    // Hash the user password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Create the user
    const user = await Users.create({
      userEmail,
      userPassword: hashedPassword,
      userProfile: profileUrl,
      userRole,
      workFor: business._id, // Set the workFor field to the business ID
    });

    // Create the employee
    const newEmployee = await Employees.create({
      firstName,
      lastName,
      telephone,
      idCard,
      workFor: business._id, // Set the workFor field to the business ID
    });

    // Update the business with the new user (pushing the user ID into the business users array)
    await Businesses.findByIdAndUpdate(
      business._id,
      { $push: { users: user._id } },
      { new: true }
    );

    return {
      message: "Employee recorded",
      employee: newEmployee,
      user,
    };
  } catch (error) {
    // Improved error handling
    console.error(error);
    throw new Error(`Error creating employee: ${error.message}`);
  }
};



// service to retrieve all employees
export const getEmp = async () => {
  return await Employees.find().populate('workFor')
};

// service to retrieve a single employee 
export const getOneEmp = async (id) => {
  return await Employees.findById(id).populate('workFor')
};

// service to update employee info by id

export const updateEmployee = async (id, empData) => {
  try {
    // Find the employee by ID
    const employee = await Employees.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }

    // Update the employee information
    const updatedEmployee = await Employees.findByIdAndUpdate(id, empData, { new: true });

    return updatedEmployee;
  } catch (error) {
    throw new Error(`Error updating employee: ${error.message}`);
  }
};


// service delete a employee
export const deleteEmployee = async (id) => {
  await Employees.findByIdAndDelete(id);
};
