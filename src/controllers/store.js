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
