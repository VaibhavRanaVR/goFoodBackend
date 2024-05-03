// productController.js
const Product = require("../schemas/ProductSchema"); // Adjust path as necessary

exports.addProduct = async (req, res) => {
  const { name, price, description, category, image, stock, added_by, prices } =
    req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image,
      stock,
      added_by,
      prices,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("added_by", "username") // Assuming you want to show the username of the user who added the product
      .populate("category", "name"); // Assuming you want to show the category name
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  const { name, categoryId } = req.query; // Using query parameters to filter by name and category ID
  try {
    const query = {};
    if (name) query.name = { $regex: name, $options: "i" }; // Case insensitive search
    if (categoryId) query.category = categoryId;

    const products = await Product.find(query).populate(
      "category",
      "name description"
    ); // Populate category details
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching for products", error: error.message });
  }
};

// Get products filtered by category only
exports.filterProductsByCategory = async (req, res) => {
  const { categoryId } = req.query; // Using query parameters to filter by category ID
  try {
    const products = await Product.find({ category: categoryId }).populate(
      "category",
      "name description"
    ); // Populate category details
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error filtering products by category",
      error: error.message,
    });
  }
};

exports.getProductByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find products added by the user
    const products = await Product.find({ added_by: userId })
      .populate("category")
      .exec();

    // Check if products exist
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this user" });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
