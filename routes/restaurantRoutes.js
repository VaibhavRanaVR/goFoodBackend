// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.post("/create/restaurants", restaurantController.createRestaurants);
router.get("/get/restaurants/details", restaurantController.getRestaurants);
router.get(
  "/restaurants/user/:userId",
  restaurantController.getRestaurantByUserId
);


module.exports = router;
