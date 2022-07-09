import express from "express";
import {
  createClient,
  deleteEmployee,
  getAllUsers,
  getClientsByEmployeeId,
  getUserById,
  login,
  register,
  setRole,
  updateEmployee,
} from "../controllers/employeeController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id/clients", checkAuth, getClientsByEmployeeId);
router.post("/:id/client", checkAuth, createClient);
router.post("/login", login);
router.post("/register", checkAuth, register);
router.put("/:id/roles", checkAuth, setRole);
router
  .route("/:id")
  .get(checkAuth, getUserById)
  .put(checkAuth, updateEmployee)
  .delete(checkAuth, deleteEmployee);

export default router;
