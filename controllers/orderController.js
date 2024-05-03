// orderController.js
const Order = require("../schemas/OrderSchema"); // Make sure this path matches where your Order model is located

// Add a new order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

// Update an existing order
exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};

exports.getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find orders by user ID
    const orders = await Order.find({ user: userId })
      .populate("orderItems.product")
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .exec();

    // Check if orders exist
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getOrderByRestaurants = async (req, res) => {
  try {
    // Extract the restaurant ID from the request params
    const restaurantId = req.params.restaurantId;

    // Find all orders with at least one order item whose product was added by the restaurant
    const orders = await Order.find()
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          match: { added_by: restaurantId },
          select: "-added_by", // Exclude added_by field from the product data in order items
        },
      })
      .sort({ updatedAt: -1 })
      .exec();

    // Filter out orders with at least one non-null product in orderItems
    const filteredOrders = orders.filter((order) => {
      return order.orderItems.some((orderItem) => orderItem.product !== null);
    });

    res.json(filteredOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

