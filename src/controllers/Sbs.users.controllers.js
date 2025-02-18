import * as userService from "../services/Sbs.users.services"
import { validateLoginUser, validateUpdateUser } from "../validation/Sbs.users.validation";
import generateToken from "../utils/generateToken";
// Controller to login function

export const login = async(req, res) =>{
    const {error, value} = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      try {
    const user = await userService.loginUser(value);
    const token = generateToken(user._id);
    res.status(200).json({
      message: "Logged in",
      data: user,
      token,
    });
      } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Internal server error",
            error: error.message,
          });
      }
}

export const updateUser = async (req, res) => {
  const { error, value } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(id, value);

    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userService.deleteUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      status: "200",
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    return res.status(200).json({
      status: "200",
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};