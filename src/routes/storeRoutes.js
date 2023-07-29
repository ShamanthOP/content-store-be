import express from "express";
import {
    createStore,
    deleteStore,
    getStoreById,
    getStores,
    updateStore,
} from "../controllers/store.js";
import clerk from "../utils/clerk.js";

const storeRouter = express.Router();

storeRouter.get("/", clerk.expressRequireAuth(), getStores);
storeRouter.post("/", clerk.expressRequireAuth(), createStore);
storeRouter.patch("/:storeId", clerk.expressRequireAuth(), updateStore);
storeRouter.delete("/:storeId", clerk.expressRequireAuth(), deleteStore);
storeRouter.get("/:storeId", getStoreById);

export default storeRouter;
