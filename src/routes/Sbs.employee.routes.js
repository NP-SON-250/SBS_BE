import express from "express";
import { 
    createEmployee,
    getEmployees,
    getOneEmployee,
    updateEmployee,
    deleteEmployee

 } from "../controllers/Sbs.employees.controllers";
import fileUpload from "../helper/multer";
import { owner,manager,cashier,server } from "../middleware/middleware";

const employeeRoute = express.Router();


employeeRoute.get("/", getEmployees);
employeeRoute.get("/:id", getOneEmployee);
employeeRoute.post("/", fileUpload.single("userProfile"),createEmployee);
employeeRoute.put("/:id", fileUpload.single("telephone"), updateEmployee);
employeeRoute.delete("/:id", deleteEmployee);

export default employeeRoute;