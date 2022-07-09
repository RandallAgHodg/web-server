import PrismaClient from "../db/prismaClient.js";
import { uploadPicture, deletePicture } from "../helpers/image.js";
import url from "url";
import querystring from "querystring";

const getAllProducts = async (req, res) => {
  try {
    if (req.query.name) {
      const product = await PrismaClient.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          name: {
            contains: req.query.name,
          },
          state: true,
        },
      });

      return res.json(product);
    }
    const products = await PrismaClient.product.findMany({
      select: {
        id: true,
        description: true,
        name: true,
        image: true,
        price: true,
        providerId: true,
        stock: true,
      },
      where: {
        state: true,
      },
    });
    return res.json(products);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const getProductById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const product = await PrismaClient.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        description: true,
        name: true,
        image: true,
        image_id: true,
        price: true,
        providerId: true,
        stock: true,
      },
    });

    if (!product || !product.state) throw new Error("Product not found");
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { secure_url, public_id } = await uploadPicture(req.file.path);
    (req.body.image = secure_url), (req.body.image_id = public_id);
    req.body.price = Number(req.body.price);
    const product = await PrismaClient.product.create({
      data: {
        ...req.body,
        stock: 0,
        state: true,
        createdAt: new Date(Date.now()),
      },
      select: {
        id: true,
        description: true,
        name: true,
        image: true,
        image_id: true,
        price: true,
        providerId: true,
        stock: true,
      },
    });
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  const id = Number(req.params.id);
  req.body.price = Number(req.body?.price);
  if (!req.body.price) delete req.body.price;
  try {
    let product;
    if (req.file) {
      const productDB = await PrismaClient.product.findUnique({
        where: {
          id,
        },
      });
      if (!productDB || !productDB.state) throw new Error("Product not found");
      const result = await deletePicture(productDB.image_id);
      if (!result) throw new Error("Image upload error. Please try again");

      const { secure_url, public_id } = await uploadPicture(req.file.path);
      (req.body.image = secure_url), (req.body.image_id = public_id);
      product = await PrismaClient.product.updateMany({
        where: {
          id,
          state: true,
        },
        data: {
          ...req.body,
          state: true,
        },
        select: {
          id: true,
          description: true,
          name: true,
          image: true,
          image_id: true,
          price: true,
          providerId: true,
          stock: true,
        },
      });
    } else {
      product = await PrismaClient.product.updateMany({
        where: {
          id,
          state: true,
        },
        data: {
          ...req.body,
          state: true,
        },
        select: {
          id: true,
          description: true,
          name: true,
          image: true,
          image_id: true,
          price: true,
          providerId: true,
          stock: true,
        },
      });
    }
    if (product.count === 0) throw new Error("Product not found");
    return res.json({ msg: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const { count } = await PrismaClient.product.updateMany({
      where: {
        id,
        state: true,
      },
      data: {
        state: false,
      },
    });

    if (count === 0) throw new Error("Product not found");
    return res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const addProviderToProduct = async (req, res) => {
  const id = Number(req.params.id);
  const providerId = Number(req.params.providerId);

  try {
    const provider = await PrismaClient.provider.findUnique({
      where: {
        id: providerId,
      },
    });
    if (!provider || !provider.state) throw new Error("Provider not found");
    const { count } = await PrismaClient.product.updateMany({
      where: {
        id,
        state: true,
      },
      data: {
        providerId,
      },
    });

    if (count === 0) throw new Error("Product not found");

    return res.json({ msg: "Provider added successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const getProductsByName = async (req, res) => {
  const { name } = req.params;
  try {
    const products = await PrismaClient.product.findMany({
      where: {
        name,
      },
    });

    return res.json(products);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProviderToProduct,
  getProductsByName,
};
