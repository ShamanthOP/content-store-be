import express from "express";
import {
    createStore,
    deleteStore,
    getStoreById,
    getStores,
    updateStore,
} from "../controllers/store.js";

const storeRouter = express.Router();

storeRouter.get("/", getStores);
storeRouter.post("/", createStore);
storeRouter.patch("/:storeId", updateStore);
storeRouter.delete("/:storeId", deleteStore);
storeRouter.get("/:storeId", getStoreById);

export default storeRouter;
