import express from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../controllers/product.js";
import clerk from "../utils/clerk.js";

const productRouter = express.Router({ mergeParams: true });

productRouter.get("/", getProducts);
productRouter.post("/", clerk.expressRequireAuth(), createProduct);
productRouter.patch("/:productId", clerk.expressRequireAuth(), updateProduct);
productRouter.delete("/:productId", clerk.expressRequireAuth(), deleteProduct);
productRouter.get("/:productId", getProductById);

export default productRouter;
