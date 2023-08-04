import prisma from "../utils/db.js";

export const getProducts = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const { searchParams } = new URL(req.url, "https://example.com");
        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const isFeatured =
            searchParams.get("isFeatured") === null
                ? undefined
                : searchParams.get("isFeatured") === "true";
        const isArchived =
            searchParams.get("isArchived") === null
                ? undefined
                : searchParams.get("isArchived") === "true";

        const products = await prisma.product.findMany({
            where: {
                storeId,
                categoryId,
                sizeId,
                colorId,
                isArchived,
                isFeatured,
            },
            include: {
                category: true,
                size: true,
                color: true,
                images: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.json(products);
    } catch (error) {
        console.log("[PRODUCT_GET]", error);
        res.status(500).send(error.message);
    }
};

export const createProduct = async (req, res) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).send("Unauthenticated");
        }

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived,
        } = req.body;
        if (!name) {
            return res.status(400).send("Name is required");
        }

        if (!price) {
            return res.status(400).send("Price is required");
        }

        if (!sizeId) {
            return res.status(400).send("Size Id is required");
        }

        if (!colorId) {
            return res.status(400).send("Color Id is required");
        }

        if (!categoryId) {
            return res.status(400).send("Category Id required");
        }

        if (!images || !images.length) {
            return res.status(400).send("Images is required");
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

        const product = await prisma.product.create({
            data: {
                name,
                price,
                storeId,
                categoryId,
                sizeId,
                colorId,
                isFeatured,
                isArchived,
                images: {
                    createMany: {
                        data: [...images.map((image) => image)],
                    },
                },
            },
        });

        return res.json(product);
    } catch (error) {
        console.log("[PRODUCT_POST]", error);
        res.status(500).send(error.message);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).send("Unauthenticated");
        }

        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const productId = req.params.productId;
        if (!productId) {
            return res.status(400).send("Product id is required");
        }

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived,
        } = req.body;
        if (!name) {
            return res.status(400).send("Name is required");
        }

        if (!price) {
            return res.status(400).send("Price is required");
        }

        if (!sizeId) {
            return res.status(400).send("Size Id is required");
        }

        if (!colorId) {
            return res.status(400).send("Color Id is required");
        }

        if (!categoryId) {
            return res.status(400).send("Category Id required");
        }

        if (!images || !images.length) {
            return res.status(400).send("Images is required");
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

        await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                name,
                price,
                storeId,
                categoryId,
                sizeId,
                colorId,
                isFeatured,
                isArchived,
                images: {
                    deleteMany: {},
                },
            },
        });

        const updatedProduct = await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [...images.map((image) => image)],
                    },
                },
            },
        });

        return res.json(updatedProduct);
    } catch (error) {
        console.log("[PRODUCT_PATCH]", error);
        res.status(500).send(error.message);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).send("Unauthenticated");
        }

        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const productId = req.params.productId;
        if (!productId) {
            return res.status(400).send("Product id is required");
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

        const deletedProduct = await prisma.product.deleteMany({
            where: {
                id: productId,
            },
        });

        return res.json(deletedProduct);
    } catch (error) {
        console.log("[PRODUCT_DELETE]", error);
        res.status(500).send(error.message);
    }
};

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!productId) {
            return res.status(400).send("Product id is required");
        }

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                category: true,
                size: true,
                color: true,
                images: true,
            },
        });

        return res.json(product);
    } catch (error) {
        console.log("[PRODUCT_GET_BY_ID]", error);
        res.status(500).send(error.message);
    }
};
