import { createClerkClient } from "@clerk/clerk-sdk-node";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { createStore, getStore, getStoreById } from "./controllers/store.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN_URL }));
app.use(express.json());

export const clerk = createClerkClient({
    apiKey: process.env.CLERK_API_KEY,
});

app.use(clerk.expressRequireAuth());

app.get("/", async (req, res) => {
    res.json({
        hello: "message",
    });
});

app.get("/store", getStore);
app.post("/store", createStore);
app.get("/store/:storeId", getStoreById);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
