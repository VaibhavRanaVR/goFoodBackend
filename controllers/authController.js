// controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../schemas/UserSchema");
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
  const { phone, email, password, role, fullName } = req.body;
  try {
    // Check if email already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already exists", details: null });
    }

    // Check if phone number already exists
    existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Phone number already exists", details: null });
    }

    // Create new user if validations pass
    const newUser = new User({ phone, email, password, role, fullName });
    await newUser.save();
    res.status(201).send("User registered");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password"); // Ensure password is selected for comparison
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
