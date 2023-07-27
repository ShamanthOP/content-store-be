import express from "express";
import {
    createBillboard,
    deleteBillboard,
    getBillboardById,
    getBillboards,
    updateBillboard,
} from "../controllers/billboard.js";

const billboardRouter = express.Router({ mergeParams: true });

billboardRouter.get("/", getBillboards);
billboardRouter.post("/", createBillboard);
billboardRouter.patch("/:billboardId", updateBillboard);
billboardRouter.delete("/:billboardId", deleteBillboard);
billboardRouter.get("/:billboardId", getBillboardById);

export default billboardRouter;
