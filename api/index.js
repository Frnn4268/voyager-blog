const express = require("express");
const connectDB = require("./config/mongoDB"); // MongoDB connection
const userRoutes = require("./routes/authRoute"); // Import user routes
const postRoutes = require("./routes/postRoute"); // Import post routes
const securityMiddlewares = require("./middlewares/securityMiddlewares"); // Import security middleware

const app = express();

// Apply security middlewares
securityMiddlewares(app);

app.use("/uploads", express.static(__dirname + "/uploads")); // Serve static files

// Call the connectDB function to establish MongoDB connection
connectDB();

// Using the routes
app.use("/api", userRoutes);
app.use("/api", postRoutes);

const PORT_BACKEND = process.env.PORT || 4001;

app.listen(PORT_BACKEND, () => {
  console.log(`Server is running on port ${PORT_BACKEND}`);
});