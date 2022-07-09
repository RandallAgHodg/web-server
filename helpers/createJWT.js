import jwt from "jsonwebtoken";

export default (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "30d",
  });
};
