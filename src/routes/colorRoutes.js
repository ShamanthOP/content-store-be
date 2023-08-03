import express from "express";
import clerk from "../utils/clerk.js";
import {
    createColor,
    deleteColor,
    getColorById,
    getColors,
    updateColor,
} from "../controllers/color.js";

const colorRouter = express.Router({ mergeParams: true });

colorRouter.get("/", getColors);
colorRouter.post("/", clerk.expressRequireAuth(), createColor);
colorRouter.patch("/:colorId", clerk.expressRequireAuth(), updateColor);
colorRouter.delete("/:colorId", clerk.expressRequireAuth(), deleteColor);
colorRouter.get("/:colorId", getColorById);

export default colorRouter;
