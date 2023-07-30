export const getCategories = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const categories = await prisma.category.findMany({
            where: {
                storeId,
            },
            include: {
                billboard: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.json(categories);
    } catch (error) {
        console.log("[CATEGORY_GET]", error);
        res.status(500).send(error.message);
    }
};

export const craeteCategory = async (req, res) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).send("Unauthenticated");
        }

        const { name, billboardId } = req.body;
        if (!name) {
            return res.status(400).send("Name is required");
        }

        if (!billboardId) {
            return res.status(400).send("Billboard Id is required");
        }

        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const storeByUserId = await prisma.store.findFirst({
            where: {
                id: storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return res.status(403).send("UnAuthorized");
        }

        const category = await prisma.category.create({
            data: {
                name,
                billboardId,
                storeId,
            },
        });

        return res.json(category);
    } catch (error) {
        console.log("[CATEGORY_POST]", error);
        res.status(500).send(error.message);
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).send("Unauthenticated");
        }

        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const categoryId = req.params.categoryId;
        if (!categoryId) {
            return res.status(400).send("Category id is required");
        }

        const { name, billboardId } = req.body;
        if (!name) {
            return res.status(400).send("Name is required");
        }

        if (!billboardId) {
            return res.status(400).send("Billboard id is required");
        }

        const storeByUserId = await prisma.store.findFirst({
            where: {
                id: storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return res.status(403).send("UnAuthorized");
        }

        const updatedCategory = await prisma.category.updateMany({
            where: {
                id: categoryId,
            },
            data: {
                name,
                billboardId,
            },
        });

        return res.json(updatedCategory);
    } catch (error) {
        console.log("[CATEGORY_PATCH]", error);
        res.status(500).send(error.message);
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).send("Unauthenticated");
        }

        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const categoryId = req.params.categoryId;
        if (!categoryId) {
            return res.status(400).send("Category id is required");
        }

        const storeByUserId = await prisma.store.findFirst({
            where: {
                id: storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return res.status(403).send("UnAuthorized");
        }

        const deletedCategory = await prisma.category.deleteMany({
            where: {
                id: categoryId,
            },
        });

        return res.json(deletedCategory);
    } catch (error) {
        console.log("[CATEGORY_DELETE]", error);
        res.status(500).send(error.message);
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            return res.status(400).send("Billboard id is required");
        }

        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });

        return res.json(category);
    } catch (error) {
        console.log("[CATEGORY_GET_BY_ID]", error);
        res.status(500).send(error.message);
    }
};
