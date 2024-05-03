// orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController"); // Adjust the path as necessary

router.post("/orders", orderController.createOrder);
router.put("/admin/orders/:orderId", orderController.updateOrder);
router.delete("/orders/:orderId", orderController.deleteOrder);
router.get("/orders/:userId", orderController.getOrderByUserId);
router.get(
  "/admin/orders/:restaurantId",
  orderController.getOrderByRestaurants
);
module.exports = router;
