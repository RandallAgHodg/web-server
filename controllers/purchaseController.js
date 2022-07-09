import PrismaClient from "../db/prismaClient.js";

const createPurchase = async (req, res) => {
  try {
    const purchase = await PrismaClient.purchase.create({
      data: {
        total: 0,
        createdAt: new Date(Date.now()),
      },
    });
    return res.json(purchase);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const getPurchaseById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const purchase = await PrismaClient.purchase.findUnique({
      where: {
        id,
      },
      include: {
        detailPurchase: true,
      },
    });
    if (!purchase) throw new Error("Purchase not found");

    return res.json(purchase);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const deletePurchase = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const purchase = await PrismaClient.purchase.findMany({
      where: {
        id,
        state: true,
      },
    });

    if (purchase.length === 0) throw new Error("Purchase not found");

    const detailPurchase = await PrismaClient.detailPurchase.findMany({
      where: {
        purchaseId: id,
        state: true,
      },
    });

    detailPurchase.forEach(async (dp) => {
      await PrismaClient.product.updateMany({
        where: {
          id: dp.productId,
        },
        data: {
          stock: {
            decrement: dp.ammount,
          },
        },
      });

      await PrismaClient.purchase.updateMany({
        where: {
          id: dp.purchaseId,
          state: true,
        },
        data: {
          total: {
            decrement: dp.subtotal,
          },
        },
      });

      await PrismaClient.detailPurchase.update({
        where: {
          id: dp.id,
        },
        data: {
          state: false,
        },
      });
    });

    await PrismaClient.purchase.update({
      where: {
        id,
      },
      data: {
        state: false,
      },
    });

    return res.json({ msg: "Purchase deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const createDetailPurchase = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const purchase = await PrismaClient.purchase.findMany({
      where: {
        id,
        state: true,
      },
    });
    if (purchase.length === 0) throw new Error("Purchase not found");

    const product = await PrismaClient.product.updateMany({
      where: {
        id: Number(req.body.productId),
        state: true,
      },
      data: {
        stock: {
          increment: req.body.ammount,
        },
      },
    });

    if (product.count === 0) throw new Error("Product not found");

    const provider = await PrismaClient.provider.findMany({
      where: {
        id: Number(req.body.providerId),
        state: true,
      },
    });

    if (provider.length === 0) throw new Error("Provider not found");

    const detailPurchase = await PrismaClient.detailPurchase.create({
      data: {
        ...req.body,
        state: true,
        createdAt: new Date(Date.now()),
        purchaseId: id,
      },
    });

    await PrismaClient.purchase.update({
      where: {
        id,
      },
      data: {
        total: {
          increment: detailPurchase.subtotal,
        },
      },
    });

    return res.json({ msg: "Purchase added successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await PrismaClient.purchase.findMany({
      where: {
        state: true,
      },
      select: {
        id: true,
        createdAt: true,
        total: true,
        detailPurchase: true,
      },
    });
    return res.json(purchases);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

export {
  createPurchase,
  getPurchaseById,
  deletePurchase,
  createDetailPurchase,
  getAllPurchases,
};
