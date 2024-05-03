// categoryController.js
const Category = require("../schemas/CategorySchema"); // Adjust path as necessary

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(409)
        .json({ message: "Category with this name already exists" });
    }

    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding category", error: error.message });
  }
};
exports.getCategoryList = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding category", error: error.message });
  }
};
exports.updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name, description } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};
