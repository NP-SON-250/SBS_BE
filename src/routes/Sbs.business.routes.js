import express from "express";
import { 
    createBusiness,
    updateBusiness,
    getBusinesses,
    getOnebusiness,
    deletebusiness

 } from "../controllers/Sbs.businesses.controllers";
import fileUpload from "../helper/multer";
import { owner } from "../middleware/middleware";

const businessRoute = express.Router();


businessRoute.get("/", getBusinesses);
businessRoute.get("/:id", getOnebusiness);
businessRoute.post("/", fileUpload.single("bsProfile"),createBusiness);
businessRoute.put("/:id", fileUpload.single("bsProfile"), updateBusiness);
businessRoute.delete("/:id", deletebusiness);

export default businessRoute;