// categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController"); // Adjust path as necessary

router.post("/categories", categoryController.createCategory);
router.put("/categories/:categoryId", categoryController.updateCategory);
router.delete("/categories/:categoryId", categoryController.deleteCategory);
router.get("/categories",categoryController.getCategoryList)

module.exports = router;
