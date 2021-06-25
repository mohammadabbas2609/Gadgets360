import express from "express";
import {
  getProductDetail,
  getProducts,
} from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProductDetail);

export default router;
