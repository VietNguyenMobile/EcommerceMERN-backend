const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  getDetailsProduct,
  getAllProduct,
  deleteProduct,
} = require("../controllers/ProductController");
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

router.post("/create-product", createProduct);
router.put("/update-product/:id", authMiddleware, updateProduct);
router.get("/get-details/:id", getDetailsProduct);
router.delete("/delete-product/:id", authMiddleware, deleteProduct);
router.get("/getAll", authMiddleware, getAllProduct);


module.exports = router;