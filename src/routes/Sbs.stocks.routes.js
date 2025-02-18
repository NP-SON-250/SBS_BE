import express from "express";
import { 
    createStock,
    updateStock,
    getStocks,
    getOneSt,
    deleteStock

 } from "../controllers/Sbs.stock.controllers";
import fileUpload from "../helper/multer";
import { owner } from "../middleware/middleware";

const stockRoute = express.Router();


stockRoute.get("/", getStocks);
stockRoute.get("/:id", getOneSt);
stockRoute.post("/", fileUpload.single("stName"),createStock);
stockRoute.put("/:id", fileUpload.single("stName"), updateStock);
stockRoute.delete("/:id", deleteStock);

export default stockRoute;