import prisma from "../utils/db.js";

export const createStore = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { name } = req.body;
        if (!name) {
            return res.status(400).send("Name is required");
        }

        const store = await prisma.store.create({
            data: {
                name,
                userId,
            },
        });

        return res.json(store);
    } catch (error) {
        console.log("[STORE_POST]", error);
        res.status(500).send(error.message);
    }
};

export const getStores = async (req, res) => {
    try {
        const { userId } = req.auth;

        const store = await prisma.store.findMany({
            where: {
                userId,
            },
        });

        return res.json(store);
    } catch (error) {
        console.log("[STORE_GET]", error);
        res.status(500).send(error.message);
    }
};

export const updateStore = async (req, res) => {
    try {
        const { userId } = req.auth;
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const { name } = req.body;
        if (!name) {
            return res.status(400).send("Name is required");
        }

        const updatedStore = await prisma.store.updateMany({
            where: {
                id: storeId,
                userId,
            },
            data: {
                name,
            },
        });

        return res.json(updatedStore);
    } catch (error) {
        console.log("[STORE_PATCH]", error);
        res.status(500).send(error.message);
    }
};

export const deleteStore = async (req, res) => {
    try {
        const { userId } = req.auth;
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const deletedStore = await prisma.store.deleteMany({
            where: {
                id: storeId,
                userId,
            },
        });

        return res.json(deletedStore);
    } catch (error) {
        console.log("[STORE_DELETE]", error);
        res.status(500).send(error.message);
    }
};

export const getStoreById = async (req, res) => {
    try {
        const { userId } = req.auth;
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const store = await prisma.store.findFirst({
            where: {
                id: storeId,
                userId,
            },
        });

        return res.json(store);
    } catch (error) {
        console.log("[STORE_GET_ID]", error);
        res.status(500).send(error.message);
    }
};
