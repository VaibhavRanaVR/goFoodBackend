const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Product must be added by an authorized user"],
  },
  prices: [
    {
      size: {
        type: String,
        required: [true, "Size is required"],
      },
      price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
      },
    },
  ],
  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: [1000, "Product description cannot exceed 1000 characters"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Product category is required"],
  },
  image: {
    type: String,
    validate: {
      validator: function (v) {
        return validator.isURL(v);
      },
      message: "Please provide a valid URL for the image",
    },
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    min: [0, "Product stock cannot be negative"],
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
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
