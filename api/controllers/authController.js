const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Register controller
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const salt = bcrypt.genSaltSync(10);

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });

    res.json(userDoc);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error: error.message });
  }
};

// Login controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const userDoc = await User.findOne({ username: username });
    if (!userDoc) {
      return res.status(400).json({ message: "Wrong password or username" });
    }

    const passOK = bcrypt.compareSync(password, userDoc.password);
    if (!passOK) {
      return res.status(400).json({ message: "Wrong password or username" });
    }

    jwt.sign(
      { username, id: userDoc._id },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: "Error generating token", error: err.message });
        }
        res.cookie("token", token, { httpOnly: true }).json({
          id: userDoc._id,
          username,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Profile controller
exports.profile = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token", error: err.message });
    }
    res.json(info);
  });
};

// Logout controller
exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true }).json("ok");
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error: error.message });
  }
};