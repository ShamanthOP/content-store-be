import prisma from "../utils/db.js";

export const getColors = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const colors = await prisma.color.findMany({
            where: {
                storeId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.json(colors);
    } catch (error) {
        console.log("COLOR_GET]", error);
        res.status(500).send(error.message);
    }
};

export const createColor = async (req, res) => {
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

        const color = await prisma.color.create({
            data: {
                name,
                value,
                storeId,
            },
        });

        return res.json(color);
    } catch (error) {
        console.log("[COLOR_POST]", error);
        res.status(500).send(error.message);
    }
};

export const updateColor = async (req, res) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).send("Unauthenticated");
        }

        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const colorId = req.params.colorId;
        if (!colorId) {
            return res.status(400).send("Color id is required");
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

        const updatedColor = await prisma.color.updateMany({
            where: {
                id: colorId,
            },
            data: {
                name,
                value,
            },
        });

        return res.json(updatedColor);
    } catch (error) {
        console.log("[COLOR_PATCH]", error);
        res.status(500).send(error.message);
    }
};

export const deleteColor = async (req, res) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).send("Unauthenticated");
        }

        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const colorId = req.params.colorId;
        if (!colorId) {
            return res.status(400).send("Color id is required");
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

        const deletedColor = await prisma.color.deleteMany({
            where: {
                id: colorId,
            },
        });

        return res.json(deletedColor);
    } catch (error) {
        console.log("[COLOR_DELETE]", error);
        res.status(500).send(error.message);
    }
};

export const getColorById = async (req, res) => {
    try {
        const colorId = req.params.colorId;
        if (!colorId) {
            return res.status(400).send("Color id is required");
        }

        const color = await prisma.color.findUnique({
            where: {
                id: colorId,
            },
        });

        return res.json(color);
    } catch (error) {
        console.log("[COLOR_GET_BY_ID]", error);
        res.status(500).send(error.message);
    }
};
