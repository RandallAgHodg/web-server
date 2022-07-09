import jwt from "jsonwebtoken";
import PrismaClient from "../db/prismaClient.js";

export default async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.SECRET);
      req.user = await PrismaClient.employee.findUnique({
        where: {
          id,
        },
        select: {
          firstname: true,
          id: true,
          lastname: true,
          email: true,
          cellphone: true,
          gender: true,
          role: true,
        },
      });
      return next();
    } catch (error) {
      console.log(error);
      return res.json({ msg: "Token not valid" });
    }
  }

  if (!token) {
    const error = new Error("Token not valid");
    return res.json({ msg: error.message });
  }

  next();
};
