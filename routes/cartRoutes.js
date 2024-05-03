// cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController"); // Adjust the path as necessary

router.post("/carts", cartController.createCart);
router.post("/carts/remove-item", cartController.removeItemFromCart);
// Edit item in cart
router.post("/carts/edit-item/:cartId", cartController.updateCart);
router.get("/cart/:userId", cartController.getCartByUserId);
router.delete("/delete/cart/:userId",cartController.deleteCart)

module.exports = router;
