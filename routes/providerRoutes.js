import express, { Router } from "express";
import {
  createProvider,
  deleteProvider,
  editProvider,
  getAllProviders,
  getProductsByProvider,
  getProviderById,
} from "../controllers/providerController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllProviders)
  .post(checkAuth, createProvider);

router
  .route("/:id")
  .get(checkAuth, getProviderById)
  .put(checkAuth, editProvider)
  .delete(checkAuth, deleteProvider);

router.get("/:id/products", checkAuth, getProductsByProvider);
export default router;
