import express from "express";
import billboardRouter from "./billboardRoutes.js";
import categoryRouter from "./categoryRoutes.js";
import sizeRouter from "./sizeRoutes.js";
import colorRouter from "./colorRoutes.js";
import productRouter from "./productRoutes.js";
import orderRouter from "./orderRoutes.js";

const customStoreRouter = express.Router({ mergeParams: true });

customStoreRouter.use("/billboards", billboardRouter);
customStoreRouter.use("/categories", categoryRouter);
customStoreRouter.use("/sizes", sizeRouter);
customStoreRouter.use("/colors", colorRouter);
customStoreRouter.use("/products", productRouter);
customStoreRouter.use("/orders", orderRouter);

export default customStoreRouter;
