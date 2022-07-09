import PrismaClient from "../db/prismaClient.js";

const createSale = async (req, res) => {
  try {
    const sale = await PrismaClient.sale.create({
      data: {
        total: 0,
        createdAt: new Date(Date.now()),
      },
    });
    return res.json(sale);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const getSaleById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const sale = await PrismaClient.sale.findUnique({
      where: {
        id,
      },
      include: {
        client: true,
        employee: true,
        DetailSales: true,
      },
    });

    if (!sale) throw new Error("Sale not found");
    return res.json(sale);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const deleteSale = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const sales = await PrismaClient.sale.findMany({
      where: {
        id,
        state: true,
      },
    });

    if (sales.length === 0) throw new Error("Sale not found");

    const detailSale = await PrismaClient.detailSales.findMany({
      where: {
        saleId: id,
        state: true,
      },
    });

    detailSale.forEach(async (ds) => {
      const product = await PrismaClient.product.findMany({
        where: {
          id: ds.productId,
          state: true,
        },
      });

      if (product.length === 0) throw new Error("Product not found");

      const productDB = product[0];
      const remainingStock = productDB.stock - ds.ammount;
      if (remainingStock <= 0)
        throw new Error(
          `There is not enough stock to satisfy the sale of the product ${productDB.name} with id ${productDB.id}`
        );

      await PrismaClient.product.updateMany({
        where: {
          id: productDB.id,
        },
        data: {
          stock: {
            increment: ds.ammount,
          },
        },
      });

      await PrismaClient.sale.updateMany({
        where: {
          id: ds.saleId,
          state: true,
        },
        data: {
          total: {
            decrement: ds.ammount,
          },
        },
      });

      await PrismaClient.detailSales.update({
        where: {
          id: ds.id,
        },
        data: {
          state: false,
        },
      });
    });

    await PrismaClient.sale.update({
      where: {
        id,
      },
      data: {
        state: false,
      },
    });

    return res.json({ msg: "Sale deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const createDetailSale = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const sale = await PrismaClient.sale.findMany({
      where: {
        id,
        state: true,
      },
    });
    if (sale.length === 0) throw new Error("Sale not found");

    const product = await PrismaClient.product.updateMany({
      where: {
        id: Number(req.body.productId),
        state: true,
      },
      data: {
        stock: {
          decrement: req.body.ammount,
        },
      },
    });

    if (product.count === 0) throw new Error("Product not found");

    const client = await PrismaClient.client.findMany({
      where: {
        id: Number(req.body.clientId),
        state: true,
      },
    });

    if (client.length === 0) throw new Error("Client not found");

    const detailSale = await PrismaClient.detailSales.create({
      data: {
        ...req.body,
        state: true,
        createdAt: new Date(Date.now()),
        saleId: id,
      },
    });

    await PrismaClient.sale.update({
      where: {
        id,
      },
      data: {
        total: {
          increment: detailSale.subtotal,
        },
      },
    });

    return res.json({ msg: "Sale added successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

export { createDetailSale, createSale, deleteSale, getSaleById };
