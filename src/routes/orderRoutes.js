import express from "express";
import { getOrders } from "../controllers/order.js";
// import clerk from "../utils/clerk.js";

const orderRouter = express.Router({ mergeParams: true });

orderRouter.get("/", getOrders);
// orderRouter.post("/", clerk.expressRequireAuth(), createBillboard);
// orderRouter.patch(
//     "/:billboardId",
//     clerk.expressRequireAuth(),
//     updateBillboard
// );
// orderRouter.delete(
//     "/:billboardId",
//     clerk.expressRequireAuth(),
//     deleteBillboard
// );
// orderRouter.get("/:billboardId", getBillboardById);

export default orderRouter;
