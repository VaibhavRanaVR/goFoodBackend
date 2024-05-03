const express = require("express");
const cors = require("cors");
const app = express();
const main = require("./Database");
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(express.json());
app.use(cors()); // Add this line to enable CORS for all routes

app.use("/api/auth", authRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

main();
app.listen(5500);
