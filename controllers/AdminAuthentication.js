const Admin = require("../schemas/AdminSchema");
const bcrypt = require("bcrypt");

app.post("/register", async (req, res) => {
  try {
    const admin = new Admin(req.body);
    // Hash the password before saving it to the database
    user.password = await bcrypt.hash(req.body.password, 10);
    const result = await admin.save();
    res.status(200).send("Registration successful.");
  } catch (error) {
    console.error("Error occurred during registration:", error);
    res.status(500).send("An error occurred during registration.");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const admin = await Admin.findOne({ email });
      if (admin) {
        // Compare the provided password with the user's password
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (passwordMatch) {
          res.status(200).send("Login successful.");
        } else {
          res.status(401).send("Incorrect password.");
        }
      } else {
        res.status(404).send("No user found.");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      res.status(500).send("An error occurred during login.");
    }
  } else {
    res.status(400).send("Email and password are required.");
  }
});
