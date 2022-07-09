import { Gender, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import PrismaClient from "../db/prismaClient.js";
import createJWT from "../helpers/createJWT.js";

const register = async (req, res) => {
  const { role } = req.user;
  try {
    if (role !== Role.ADMIN) throw new Error("Unauthorized action");
    const isFound = await PrismaClient.employee.findUnique({
      where: {
        email,
      },
    });
    if (isFound) throw new Error("The email is already used");

    const password = await bcrypt.hash(unhashedPassword, 10);
    const user = await PrismaClient.employee.create({
      data: {
        ...req.body,
        gender:
          req.body.gender.toLowerCase().trim() === "male"
            ? Gender.MALE
            : Gender.FEMALE,
        createdAt: new Date(Date.now()),
        role: Role.EMPLOYEE,
        state: true,
        password,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        cellphone: true,
        gender: true,
        role: true,
        state: true,
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const setRole = async (req, res) => {
  const id = Number(req.params.id);
  const { role } = req.user;
  const { role: roleEdit } = req.body;
  try {
    if (role !== Role.ADMIN) throw new Error("Unauthorized action");
    const user = await PrismaClient.employee.update({
      where: {
        id,
      },
      data: {
        role:
          roleEdit.toLowerCase().trim() === "admin"
            ? Role.ADMIN
            : Role.EMPLOYEE,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        cellphone: true,
        gender: true,
        role: true,
        state: true,
      },
    });

    if (!user || !user.state) throw new Error("User not found");
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const getUserById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const user = await PrismaClient.employee.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        cellphone: true,
        gender: true,
        role: true,
        state: true,
      },
    });
    if (!user || !user.state) throw new Error("User not found");
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await PrismaClient.employee.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        cellphone: true,
        gender: true,
        role: true,
        password: true,
        state: true,
      },
    });
    if (!user || !user.state) throw new Error("Wrong credentials");
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new Error("Wrong credentials");
    return res.json({ token: createJWT(user.id) });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const updateEmployee = async (req, res) => {
  const id = Number(req.params.id);
  const { role } = req.user;

  try {
    if (role !== Role.ADMIN) throw new Error("Unauthorized action");
    const user = await PrismaClient.employee.update({
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
        email: true,
        cellphone: true,
        gender: true,
        role: true,
        state: true,
      },
    });
    if (!user) throw new Error("User not found");
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  try {
    if (role !== Role.ADMIN) throw new Error("Unauthorized action");
    const user = await PrismaClient.employee.update({
      where: {
        id: Number(id),
      },
      data: {
        state: false,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        cellphone: true,
        gender: true,
        role: true,
        state: true,
      },
    });

    if (!user) throw new Error("User not found");
    return res.json({ msg: "User removed successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await PrismaClient.employee.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        cellphone: true,
        gender: true,
        role: true,
        state: true,
      },
      where: {
        state: true,
      },
    });

    return res.json({ user });
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const getClientsByEmployeeId = async (req, res) => {
  const employeeId = Number(req.params.id);

  try {
    const user = await PrismaClient.employee.findUnique({
      where: {
        id: employeeId,
      },
      select: {
        client: true,
      },
    });

    if (!user) throw new Error("User not found");
    const client = await PrismaClient.client.findMany({
      where: {
        employeeId,
        state: true,
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
    return res.json(client);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const createClient = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const employee = await PrismaClient.employee.findUnique({
      where: {
        id,
      },
    });
    if (!employee) throw new Error("User not found");
    const client = await PrismaClient.client.create({
      data: {
        ...req.body,
        gender:
          req.body.gender.toLowerCase().trim() === "male"
            ? Gender.MALE
            : Gender.FEMALE,
        employeeId: employee.id,
        state: true,
        createdAt: new Date(Date.now()),
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

    return res.json(client);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

const getSalesByEmployee = async (req, res) => {
  const employeeId = Number(req.params.id);
  try {
    const sales = await PrismaClient.sale.findMany({
      where: {
        employeeId,
      },
      include: {
        client: true,
        employee: true,
        DetailSales: true,
      },
    });

    if (sales.length === 0) throw new Error("Employee not found");
    return res.json(sales);
  } catch (error) {
    console.log(error);
    return res.json({ msg: error.message });
  }
};

export {
  register,
  login,
  getUserById,
  setRole,
  updateEmployee,
  deleteEmployee,
  getAllUsers,
  getClientsByEmployeeId,
  createClient,
  getSalesByEmployee,
};
