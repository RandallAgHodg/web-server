import express from "express";
import { get } from "http";
import {
  createPurchase,
  getPurchaseById,
  deletePurchase,
  createDetailPurchase,
  getAllPurchases,
} from "../controllers/purchaseController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllPurchases)
  .post(checkAuth, createPurchase);
router
  .route("/:id")
  .get(checkAuth, getPurchaseById)
  .post(checkAuth, createDetailPurchase)
  .delete(checkAuth, deletePurchase);

export default router;
