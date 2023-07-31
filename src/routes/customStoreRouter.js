import express from "express";
import billboardRouter from "./billboardRoutes.js";
import categoryRouter from "./categoryRoutes.js";
import sizeRouter from "./sizeRoutes.js";

const customStoreRouter = express.Router({ mergeParams: true });

customStoreRouter.use("/billboards", billboardRouter);
customStoreRouter.use("/categories", categoryRouter);
customStoreRouter.use("/sizes", sizeRouter);

export default customStoreRouter;
