const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity of product is required"],
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
    selected_size: { type: String },
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: "updatedAt" }, // Track when items are added and last updated
  }
);

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true, // Each user can have only one cart
    },
    items: [cartItemSchema], // Array of cart item subdocuments
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Auto-add createdAt and updatedAt fields to the cart
  }
);

// Compile model from schema
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
