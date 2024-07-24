const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./config/mongoDB"); // MongoDB connection
const userRoutes = require("./routes/authRoute"); // Import user routes

app.use(cors());
app.use(express.json());

// Call the connectDB function to establish MongoDB connection
connectDB();

// Use the userRoutes
app.use("/api", userRoutes);

const PORT_BACKEND = process.env.PORT || 4001;

app.listen(PORT_BACKEND, () => {
  console.log(`Server is running on port ${PORT_BACKEND}`);
});