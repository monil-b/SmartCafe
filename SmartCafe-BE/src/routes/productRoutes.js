const express = require("express");

const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", getProducts);

// ADMIN ONLY
router.post("/", protect, admin, createProduct);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;