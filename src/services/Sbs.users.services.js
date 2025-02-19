import Users from "../models/Sbs.users.model";
import bcrypt from "bcrypt";
// Service to Login a user

export const loginUser = async (userData) => {
    const user = await Users.findOne({ userEmail: userData.userEmail });
    if (!user) {
      throw new Error("User not found");
    }
  
    const isMatch = await bcrypt.compare(userData.userPassword, user.userPassword);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
  
    return user;
  };
// Service to update a user
  export const updateUser = async (id, userData) => {
    try {
      const user = await Users.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      if(userData.userPassword){
        const saltRounds = 10;
        userData.userPassword = await bcrypt.hash(userData.userPassword,saltRounds);
      }
      const updatedUser = await Users.findByIdAndUpdate(id, userData, { new: true });
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);

    }
  };
// Service to delete a user
  export const deleteUser = async (id) => {
    try {
      const user = await Users.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
  
      await Users.findByIdAndDelete(id);
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  };
// Service to get all user
  export const getAllUsers = async () => {
    try {
      const users = await Users.find().populate('workFor');
      return users;
    } catch (error) {
      throw new Error(`Error retrieving users: ${error.message}`);
    }
  };
// Service to get single user
  export const getUserById = async (id) => {
    try {
      const user = await Users.findById(id).populate('workFor');
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(`Error retrieving user: ${error.message}`);
    }
  };