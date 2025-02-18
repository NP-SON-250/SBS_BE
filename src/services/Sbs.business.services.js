import Businesses from "../models/Sbs.businesses.model";
import Categories from "../models/Sbs.categories.model";
import Users from "../models/Sbs.users.model";
import { uploadToCloud } from "../helper/cloud";
import bcrypt from "bcrypt";

// Service to create a business
export const createBus = async (busData, file) => {
  const { bsName, bsCategory, userPassword, userEmail } = busData;

  try {
    // Upload the file (if provided) to the cloud
    let result;
    if (file) result = await uploadToCloud(file);

    // Create the business entry
    const newBusiness = await Businesses.create({
      bsName,
      bsCategory,
      bsProfile: result?.secure_url,
    });

    // Hash the user password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Save the user information
    const user = await Users.create({
      userEmail,
      userPassword: hashedPassword,
      userProfile: result?.secure_url,
      workFor:newBusiness._id,
    });

    // Push the business ID into the businesses array of the category
    const category = await Categories.findOneAndUpdate(
      { catName: bsCategory }, // Find the category by name
      { $push: { businesses: newBusiness._id } },
      { new: true } // Return the updated document
    );

    return {
      message: "Business created",
      business: newBusiness,
      addedUser: user,
    };
  } catch (error) {
    throw new Error(`Error creating business: ${error.message}`);
  }
};



// service to retrieve all businesses
export const getBus = async () => {
  return await Businesses.find()
};

// service to retrieve a single business 
export const getOneBus = async (id) => {
  return await Businesses.findById(id)
};

// service to updated business info by id
export const updateBusiness = async (id, busData, file) => {
  const { bsName, bsCategory } = busData;
  let result;
  if (file) result = await uploadToCloud(file);
  return await Businesses.findByIdAndUpdate(
    id,
    {
      bsName,
      bsCategory,
      bsProfile: result?.secure_url,
    },
    { new: true }
  );
};


// service delete a business
export const deleteBusiness = async (id) => {
  await Businesses.findByIdAndDelete(id);
};

// Service to find all users
export const findAllUsers = async () => {
  return await User.find();
};

// Service to find a single user by id
export const findUserById = async (id) => {
  return await User.findById(id);
};

// Service to create a new user
export const createUser = async (userData, file) => {
  let result;
  if (file) result = await uploadToCloud(file);

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(userData.password, salt);

  return await User.create({
    name: userData.name,
    email: userData.email,
    password: hashedPass,
    img: result?.secure_url,
  });
};

// Service to update an existing user
export const updateUserById = async (id, userData, file) => {
  let result;
  if (file) result = await uploadToCloud(file);

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(userData.password, salt);

  return await User.findByIdAndUpdate(id, {
    name: userData.name,
    email: userData.email,
    password: hashedPass,
    img: result?.secure_url,
  });
};

// Service to delete a user by id
export const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};


// Service to Login a user

export const loginUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(userData.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};

// service for forgot password
export const forgotPasswordService = async (userEmail) => {
  const user = await User.findOne({email: userEmail});
    if(!user){
      throw new Error("user not found");
    } 
    
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    await Code.create({
      code: resetCode,
      user: user._id,
    });
    const link = `https://hovastore-support-be.onrender.com/api/v1/users/reset-password`;
    sendResetEmail(user.email, user.name, link, resetCode);
};

// service to reset password
export const resetPasswordService = async (resetCode, password, confirmPassword) => {
      const code = await Code.findOne({code: resetCode});
      if(!code){
        throw new Error("Invalid Code");
      } 
      const userId = code.user;
      const user = await User.findById(userId);
      if(!user){
        throw new Error("user not found");
      }
      if(password != confirmPassword){
        throw new Error("Two passwords does not match");
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(userId, {password: hashedPass});
      await Code.findByIdAndDelete(code._id);
};


// service to change user password
export const changePassword = async (id, passData) => {
  const { current_password, new_password, confirm_password } = passData;
  const user = await User.findById(id)
    if(!user){
      throw new Error("User not found");
    }
    const passwordMatch = await bcrypt.compare( current_password, user.password)
    if(!passwordMatch){
      throw new Error("Invalid Password");
    }
    if(new_password != confirm_password){
      throw new Error("Two Passwords do not match");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);
    await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
};


