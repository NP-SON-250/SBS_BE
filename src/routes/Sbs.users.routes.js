import express from "express";
import { login,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById } from "../controllers/Sbs.users.controllers";
import fileUpload from "../helper/multer";

const userRoute = express.Router();
userRoute.post("/auth", fileUpload.single("userPassword"), login);
userRoute.put("/:id", fileUpload.single("userProfile"), updateUser);
userRoute.delete("/:id", deleteUser);
userRoute.get("/", getAllUsers);
userRoute.get("/:id", getUserById);

export default userRoute;