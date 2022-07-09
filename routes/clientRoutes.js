import express from "express";
import {
  deleteClient,
  editClient,
  getClientById,
} from "../controllers/clientController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/:id")
  .get(checkAuth, getClientById)
  .put(checkAuth, editClient)
  .delete(checkAuth, deleteClient);

export default router;
