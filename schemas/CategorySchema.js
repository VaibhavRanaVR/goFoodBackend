const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    unique: true, // Ensure no duplicate categories exist
    maxlength: [50, "Category name cannot exceed 50 characters"],
  },
  description: {
    type: String,
    required: false, // Not mandatory
    trim: true,
    maxlength: [255, "Category description cannot exceed 255 characters"],
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
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
