import express from "express";
import billboardRouter from "./billboardRoutes.js";
import categoryRouter from "./categoryRoutes.js";

const customStoreRouter = express.Router({ mergeParams: true });

customStoreRouter.use("/billboards", billboardRouter);
customStoreRouter.use("/categories", categoryRouter);

export default customStoreRouter;
