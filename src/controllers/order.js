import prisma from "../utils/db.js";

export const getOrders = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const orders = await prisma.order.findMany({
            where: {
                storeId,
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.json(orders);
    } catch (error) {
        console.log("[ORDER_GET]", error);
        res.status(500).send(error.message);
    }
};

export const createOrder = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).send("Store id is required");
        }

        const { productIds, phoneNo, address, isPaid } = req.body;
        console.log(productIds, phoneNo, address, isPaid);
        if (!productIds || productIds.length == 0) {
            return res.status(400).send("Cart is empty");
        }

        if (!phoneNo) {
            return res.status(400).send("Phone number is required");
        }

        if (!address) {
            return res.status(400).send("Address is required");
        }

        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
        });

        const order = await prisma.order.create({
            data: {
                storeId,
                isPaid,
                address,
                phone: phoneNo,
                orderItems: {
                    create: productIds.map((productId) => ({
                        product: {
                            connect: {
                                id: productId,
                            },
                        },
                    })),
                },
            },
        });
        return res.json(order);
    } catch (error) {
        console.log("[ORDER_POST]", error);
        res.status(500).send(error.message);
    }
};
