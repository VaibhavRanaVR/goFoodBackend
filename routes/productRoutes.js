// productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController"); // Adjust path as necessary

router.post("/products", productController.addProduct);
router.put("/products/:productId", productController.updateProduct);
router.delete("/products/:productId", productController.deleteProduct);
router.get("/get/all/product", productController.getAllProducts);
// Route to search products by name and category
router.get("/products/search", productController.searchProducts);

// Route to filter products by category
router.get("/products/filter", productController.filterProductsByCategory);
router.get("/restaurant/products/:userId", productController.getProductByUser);

module.exports = router;
