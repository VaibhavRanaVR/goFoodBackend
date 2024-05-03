const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, "Restaurant name is required"],
    trim: true,
    maxlength: [100, "Restaurant name cannot exceed 100 characters"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Restaurant must have an owner"],
  },
  address: {
    street: {
      type: String,
      required: [true, "Street address is required"],
      trim: true,
      maxlength: [100, "Street address cannot exceed 100 characters"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxlength: [50, "City name cannot exceed 50 characters"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
      maxlength: [50, "State name cannot exceed 50 characters"],
    },
    zipCode: {
      type: String,
      required: [true, "Zip code is required"],
      trim: true,
      maxlength: [10, "Zip code cannot exceed 10 characters"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      maxlength: [50, "Country name cannot exceed 50 characters"],
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  cuisine: {
    type: String,
    required: [true, "Cuisine type is required"],
    trim: true,
    maxlength: [50, "Cuisine type cannot exceed 50 characters"],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating cannot exceed 5"],
  },
  website: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return validator.isURL(v);
      },
      message: "Please provide a valid URL",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compile model from schema
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
