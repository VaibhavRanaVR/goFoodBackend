const express = require("express");
const router = express.Router();
const Restaurant = require("../schemas/RestaurantSchema"); // Adjust path as necessary

// POST a new restaurant
exports.createRestaurants = async (req, res) => {
  const { name, owner, address, phone, cuisine, rating, website } = req.body;
  try {
    let alreadyExist = await Restaurant.find({ owner: owner });
    if (alreadyExist.length > 0) {
      return res
        .status(409)
        .json({ error: "Already a restaurant present for this owner" });
    }

    const newRestaurant = new Restaurant({
      name,
      owner,
      address,
      phone,
      cuisine,
      rating,
      website,
    });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

// GET all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json(restaurants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRestaurantByUserId = async (req, res) => {
  // Getting the user ID from the URL parameter
  const userId = req.params.userId;
  try {
    // Finding restaurants where the 'owner' field matches the 'userId' provided
    const restaurants = await Restaurant.find({ owner: userId }).populate(
      "owner"
    );
    if (restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: "No restaurants found for this user" });
    }
    res.status(200).json(restaurants[0]);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
