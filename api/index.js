const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./config/mongoDB"); // Adjust the path according to your file structure

app.use(cors());
app.use(express.json());

// Call the connectDB function to establish MongoDB connection
connectDB();

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  res.json({ requestData: { username, password } });
});

const PORT_BACKEND = process.env.PORT || 4001;

app.listen(PORT_BACKEND, () => {
  console.log(`Server is running on port ${PORT_BACKEND}`);
});