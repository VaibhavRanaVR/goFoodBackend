// cartController.js
const Cart = require("../schemas/CartSchema"); // Adjust the path as necessary
const mongoose = require("mongoose");
// Function to handle adding items to cart or creating a new cart
exports.createCart = async (req, res) => {
  const { user, product, quantity, selected_size } = req.body;

  if (!mongoose.Types.ObjectId.isValid(product)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    let cart = await Cart.findOne({ user }).exec();
    if (cart) {
      // Check if the product already exists in the cart
      const itemIndex = cart.items.findIndex((item) =>
        item.product.equals(product)
      );

      if (itemIndex > -1) {
        // Product already exists in cart, return an error message
        return res
          .status(400)
          .json({ message: "Product already exists in cart" });
      }

      // Product does not exist in cart, add new item
      cart.items.push({ product, quantity, selected_size });
      await cart.save();
      return res.status(201).json({ message: "New item added to cart", cart });
    } else {
      // No cart exists for the user, create a new one
      const newCart = new Cart({
        user,
        items: [{ product, quantity, selected_size }],
      });
      const savedCart = await newCart.save();
      return res.status(201).json({ message: "Cart created", cart: savedCart });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error accessing or updating cart",
      error: error.message,
    });
  }
};
exports.updateCart = async (req, res) => {
  const { cartId } = req.params;
  const { items } = req.body;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $set: { items: items } },
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
};
// cartController.js
exports.editItemInCart = async (req, res) => {
  const { user, product, quantity, size } = req.body; // Expect user ID, product ID, and new values for quantity and price
  try {
    const cart = await Cart.findOne({ user: user });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // Find the item and update it
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    if (quantity) cart.items[itemIndex].quantity = quantity;
    if (size) cart.items[itemIndex].size = size;
    await cart.save();
    res.status(200).json({ message: "Cart item updated", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart item", error: error.message });
  }
};

// cartController.js
exports.removeItemFromCart = async (req, res) => {
  const { user, productId } = req.body; // Expect user ID and product ID to identify the item
  try {
    const cart = await Cart.findOne({ user: user });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // Remove the item from the cart
    const updatedItems = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    cart.items = updatedItems;
    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing item from cart", error: error.message });
  }
};

exports.getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the cart for the provided userId
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the cart for the provided userId
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Delete the cart
    await cart.deleteOne();

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
