import express from "express";
import { 
    createCategory,
    updateCategory,
    getCategories,
    getOneCategory,
    deleteCategory,

 } from "../controllers/Sbs.categories.controllers";
import fileUpload from "../helper/multer";
import { admin, owner } from "../middleware/middleware";

const categoryRoute = express.Router();


categoryRoute.get("/", getCategories);
categoryRoute.get("/:id", getOneCategory);
categoryRoute.post("/", fileUpload.single("catName"),admin,createCategory);
categoryRoute.put("/:id", fileUpload.single("catName"),admin, updateCategory);
categoryRoute.delete("/:id",admin, deleteCategory);

export default categoryRoute;