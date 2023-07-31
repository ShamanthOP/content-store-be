import express from "express";
import clerk from "../utils/clerk.js";
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    updateCategory,
} from "../controllers/category.js";

const categoryRouter = express.Router({ mergeParams: true });

categoryRouter.get("/", getCategories);
categoryRouter.post("/", clerk.expressRequireAuth(), createCategory);
categoryRouter.patch(
    "/:categoryId",
    clerk.expressRequireAuth(),
    updateCategory
);
categoryRouter.delete(
    "/:categoryId",
    clerk.expressRequireAuth(),
    deleteCategory
);
categoryRouter.get("/:categoryId", getCategoryById);

export default categoryRouter;
