import express from "express";
import {
  createDetailSale,
  createSale,
  deleteSale,
  getSaleById,
} from "../controllers/saleController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").post(checkAuth, createSale);
router
  .route("/:id")
  .get(checkAuth, getSaleById)
  .post(checkAuth, createDetailSale)
  .delete(checkAuth, deleteSale);

export default router;
