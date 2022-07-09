import { Gender, Role } from "@prisma/client";
import PrismaClient from "../db/prismaClient.js";

const getAllProviders = async (req, res) => {
  try {
    const providers = await PrismaClient.provider.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        enterprise_name: true,
        cellphone: true,
        createdAt: true,
      },
      where: {
        state: true,
      },
    });

    return res.json(providers);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const getProviderById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const provider = await PrismaClient.provider.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        enterprise_name: true,
        cellphone: true,
        createdAt: true,
        state: true,
      },
    });

    if (!provider || !provider.state) throw new Error("Provider was not found");
    return res.json(provider);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const getProductsByProvider = async (req, res) => {
  const providerId = Number(req.params.id);
  try {
    const products = await PrismaClient.product.findMany({
      where: {
        providerId,
        state: true,
      },
    });

    if (!products) throw new Error("Provider not found");
    return res.json(products);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const createProvider = async (req, res) => {
  try {
    const provider = await PrismaClient.provider.create({
      data: {
        ...req.body,
        gender:
          req.body.gender.toLowerCase().trim() === "male"
            ? Gender.MALE
            : Gender.FEMALE,
        createdAt: new Date(Date.now()),
        state: true,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        enterprise_name: true,
        cellphone: true,
        createdAt: true,
      },
    });

    return res.json(provider);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const editProvider = async (req, res) => {
  const id = Number(req.params.id);
  try {
    let provider;
    if (req.body.gender) {
      provider = await PrismaClient.provider.update({
        data: {
          ...req.body,
          gender:
            req.body.gender.toLowerCase().trim() === "male"
              ? Gender.MALE
              : Gender.FEMALE,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          enterprise_name: true,
          cellphone: true,
          createdAt: true,
        },
        where: {
          id,
        },
      });
    } else {
      provider = await PrismaClient.provider.update({
        data: {
          ...req.body,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          enterprise_name: true,
          cellphone: true,
          createdAt: true,
        },
        where: {
          id,
        },
      });
    }
    if (!provider) throw new Error("Provider was not found");
    return res.json(provider);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const deleteProvider = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const provider = PrismaClient.provider.update({
      data: {
        state: false,
      },
      where: {
        id,
        state: true,
      },
    });
    if (!provider) throw new Error("Provider was not found");
    return res.json({ msg: "Provider successfully removed" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

export {
  getAllProviders,
  getProviderById,
  getProductsByProvider,
  createProvider,
  editProvider,
  deleteProvider,
};
