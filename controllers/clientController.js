import { Gender, Role } from "@prisma/client";
import PrismaClient from "../db/prismaClient.js";

const getClientById = async (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  try {
    const client = await PrismaClient.client.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        cellphone: true,
        createdAt: true,
        enterprise_name: true,
        gender: true,
        state: true,
      },
    });
    if (!client || !client.state) throw new Error("Client not found");
    return res.json(client);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const editClient = async (req, res) => {
  const id = Number(req.params.id);
  try {
    console.log(req.body);
    let client;
    if (req.body.gender) {
      client = await PrismaClient.client.update({
        where: {
          id,
        },
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
          cellphone: true,
          createdAt: true,
          employeeId: true,
          enterprise_name: true,
          gender: true,
        },
      });
    } else {
      client = await PrismaClient.client.update({
        where: {
          id,
        },
        data: {
          ...req.body,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          cellphone: true,
          createdAt: true,
          employeeId: true,
          enterprise_name: true,
          gender: true,
        },
      });
    }
    if (!client) throw new Error("Client not found");
    return res.json(client);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const deleteClient = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const client = await PrismaClient.client.update({
      where: {
        id,
      },
      data: {
        state: false,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        cellphone: true,
        createdAt: true,
        employeeId: true,
        enterprise_name: true,
        gender: true,
      },
    });
    if (!client) throw new Error("Client not found");
    return res.json({ msg: "Client deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

export { getClientById, deleteClient, editClient };
