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
