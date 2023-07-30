import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import storeRouter from "./routes/storeRoutes.js";
import billboardRouter from "./routes/billboardRoutes.js";
import customStoreRouter from "./routes/customStoreRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/public-endpoint", (req, res) => {
    res.json({
        hello: "message",
    });
});

app.use("/store", storeRouter);
app.use("/:storeId", customStoreRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
