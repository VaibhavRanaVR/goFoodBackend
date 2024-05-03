const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
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
});

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    orderItems: [orderItemSchema],

    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compile model from schema
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
