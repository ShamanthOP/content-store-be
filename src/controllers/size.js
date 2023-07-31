import prisma from "../utils/db.js";

export const getSizes = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const sizes = await prisma.size.findMany({
            where: {
                storeId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.json(sizes);
    } catch (error) {
        console.log("[SIZE_GET]", error);
        res.status(500).send(error.message);
    }
};

export const createSize = async (req, res) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).send("Unauthenticated");
        }

        const { name, value } = req.body;
        if (!name) {
            return res.status(400).send("Name is required");
        }

        if (!value) {
            return res.status(400).send("Value is required");
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

        const size = await prisma.size.create({
            data: {
                name,
                value,
                storeId,
            },
        });

        return res.json(size);
    } catch (error) {
        console.log("[SIZE_POST]", error);
        res.status(500).send(error.message);
    }
};

export const updateSize = async (req, res) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).send("Unauthenticated");
        }

        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const sizeId = req.params.sizeId;
        if (!sizeId) {
            return res.status(400).send("Size id is required");
        }

        const { name, value } = req.body;
        if (!name) {
            return res.status(400).send("Name is required");
        }

        if (!value) {
            return res.status(400).send("Value is required");
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

        const updatedSize = await prisma.size.updateMany({
            where: {
                id: sizeId,
            },
            data: {
                name,
                value,
            },
        });

        return res.json(updatedSize);
    } catch (error) {
        console.log("[SIZE_PATCH]", error);
        res.status(500).send(error.message);
    }
};

export const deleteSize = async (req, res) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).send("Unauthenticated");
        }

        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const sizeId = req.params.sizeId;
        if (!sizeId) {
            return res.status(400).send("Size id is required");
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

        const deletedSize = await prisma.size.deleteMany({
            where: {
                id: sizeId,
            },
        });

        return res.json(deletedSize);
    } catch (error) {
        console.log("[SIZE_DELETE]", error);
        res.status(500).send(error.message);
    }
};

export const getSizeById = async (req, res) => {
    try {
        const sizeId = req.params.sizeId;
        if (!sizeId) {
            return res.status(400).send("Size id is required");
        }

        const size = await prisma.size.findUnique({
            where: {
                id: sizeId,
            },
        });

        return res.json(size);
    } catch (error) {
        console.log("[SIZE_GET_BY_ID]", error);
        res.status(500).send(error.message);
    }
};
