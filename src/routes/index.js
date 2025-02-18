import express from "express";
import docrouter from "../docs/Docs";
import categoryRoute from "./Sbs.category.routes";
import businessRoute from "./Sbs.business.routes";
import userRoute from "./Sbs.users.routes";
import employeeRoute from "./Sbs.employee.routes";
import stockRoute from "./Sbs.stocks.routes";
import productRoute from "./Sbs.products.routes";
const router = express.Router();

// Route

router.use("/docs", docrouter);
router.use("/categories", categoryRoute);
router.use("/businesses", businessRoute);
router.use("/users", userRoute);
router.use("/employees", employeeRoute);
router.use("/stocks", stockRoute);
router.use("/products", productRoute);

export default router;
