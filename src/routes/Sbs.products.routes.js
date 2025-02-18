import express from "express";
import { 
    createProduct,
    updateProduct,
    getOneProduct,
    getProducts,
    deleteProduct,
 } from "../controllers/Sbs.products.controllers";
import fileUpload from "../helper/multer";
import { owner } from "../middleware/middleware";

const productRoute = express.Router();


productRoute.get("/", getProducts);
productRoute.get("/:id", getOneProduct);
productRoute.post("/", fileUpload.single("image"),createProduct);
productRoute.put("/:id", fileUpload.single("image"), updateProduct);
productRoute.delete("/:id", deleteProduct);

export default productRoute;