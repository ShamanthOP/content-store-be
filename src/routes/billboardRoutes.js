import express from "express";
import {
    createBillboard,
    deleteBillboard,
    getBillboardById,
    getBillboards,
    updateBillboard,
} from "../controllers/billboard.js";
import clerk from "../utils/clerk.js";

const billboardRouter = express.Router({ mergeParams: true });

billboardRouter.get("/", getBillboards);
billboardRouter.post("/", clerk.expressRequireAuth(), createBillboard);
billboardRouter.patch(
    "/:billboardId",
    clerk.expressRequireAuth(),
    updateBillboard
);
billboardRouter.delete(
    "/:billboardId",
    clerk.expressRequireAuth(),
    deleteBillboard
);
billboardRouter.get("/:billboardId", getBillboardById);

export default billboardRouter;
