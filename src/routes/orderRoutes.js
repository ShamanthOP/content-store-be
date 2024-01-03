import express from "express";
import { createOrder, getOrders } from "../controllers/order.js";
// import clerk from "../utils/clerk.js";

const orderRouter = express.Router({ mergeParams: true });

orderRouter.get("/", getOrders);
orderRouter.post("/", createOrder);

export default orderRouter;
