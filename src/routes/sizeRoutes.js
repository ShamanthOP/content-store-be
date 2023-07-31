import express from "express";
import clerk from "../utils/clerk.js";
import {
    createSize,
    deleteSize,
    getSizeById,
    getSizes,
    updateSize,
} from "../controllers/size.js";

const sizeRouter = express.Router({ mergeParams: true });

sizeRouter.get("/", getSizes);
sizeRouter.post("/", clerk.expressRequireAuth(), createSize);
sizeRouter.patch("/:sizeId", clerk.expressRequireAuth(), updateSize);
sizeRouter.delete("/:sizeId", clerk.expressRequireAuth(), deleteSize);
sizeRouter.get("/:sizeId", getSizeById);

export default sizeRouter;
