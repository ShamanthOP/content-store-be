import { createClerkClient } from "@clerk/clerk-sdk-node";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import storeRouter from "./routes/storeRoutes.js";
import billboardRouter from "./routes/billboardRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const clerk = createClerkClient({
    apiKey: process.env.CLERK_API_KEY,
});

app.use(clerk.expressRequireAuth());

app.get("/protected-endpoint", (req, res) => {
    res.json(req.auth);
});

app.use("/store", storeRouter);
app.use("/:storeId/billboards", billboardRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
