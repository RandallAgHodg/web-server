import express from "express";
import multer from "../config/multer.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  addProviderToProduct,
} from "../controllers/productController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllProducts)
  .post(checkAuth, multer.single("image"), createProduct);
router
  .route("/:id")
  .get(checkAuth, getProductById)
  .put(checkAuth, multer.single("image"), updateProduct)
  .delete(checkAuth, deleteProduct);

router.put("/:id/provider/:providerId", checkAuth, addProviderToProduct);
export default router;
