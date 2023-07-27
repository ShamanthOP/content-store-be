import prisma from "../utils/db.js";

export const createBillboard = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { label, imageUrl } = req.body;
        if (!label) {
            return res.status(400).send("Label is required");
        }

        if (!imageUrl) {
            return res.status(400).send("Image Url is required");
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

        const billboard = await prisma.billboard.create({
            data: {
                label,
                imageUrl,
                storeId,
            },
        });

        return res.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_POST]", error);
        res.status(500).send(error.message);
    }
};

export const getBillboards = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const billboards = await prisma.billboard.findMany({
            where: {
                storeId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.json(billboards);
    } catch (error) {
        console.log("[BILLBOARD_GET]", error);
        res.status(500).send(error.message);
    }
};

export const updateBillboard = async (req, res) => {
    try {
        const { userId } = req.auth;
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const billboardId = req.params.billboardId;
        if (!billboardId) {
            return res.status(400).send("Billboard id is required");
        }

        const { label, imageUrl } = req.body;
        if (!label) {
            return res.status(400).send("Label is required");
        }

        if (!imageUrl) {
            return res.status(400).send("Image Url is required");
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

        const updatedBillboard = await prisma.billboard.updateMany({
            where: {
                id: billboardId,
            },
            data: {
                label,
                imageUrl,
            },
        });

        return res.json(updatedBillboard);
    } catch (error) {
        console.log("[BILLBOARD_PATCH]", error);
        res.status(500).send(error.message);
    }
};

export const deleteBillboard = async (req, res) => {
    try {
        const { userId } = req.auth;
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const billboardId = req.params.billboardId;
        if (!billboardId) {
            return res.status(400).send("Billboard id is required");
        }

        const storeByUserId = await prisma.billboard.findFirst({
            where: {
                id: storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return res.status(403).send("UnAuthorized");
        }

        const deletedBillboard = await prisma.billboard.deleteMany({
            where: {
                id: billboardId,
            },
        });

        return res.json(deletedBillboard);
    } catch (error) {
        console.log("[BILLBOARD_DELETE]", error);
        res.status(500).send(error.message);
    }
};

export const getBillboardById = async (req, res) => {
    try {
        const billboardId = req.params.billboardId;
        if (!billboardId) {
            return res.status(400).send("Billboard id is required");
        }

        const billboard = await prisma.billboard.findUnique({
            where: {
                id: billboardId,
            },
        });

        return res.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_GET_BY_ID]", error);
        res.status(500).send(error.message);
    }
};
