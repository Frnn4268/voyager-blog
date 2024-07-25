const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const salt = bcrypt.genSaltSync(10);

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });

    res.json(userDoc);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.findOne({ username: username });
    if (!userDoc) {
      return res.status(400).json("Wrong password or username");
    }

    const passOK = bcrypt.compareSync(password, userDoc.password);
    if (!passOK) {
      return res.status(400).json("Wrong password or username");
    }

    jwt.sign(
      { username, id: userDoc._id },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error generating token", error: err.message });
        }
        res.cookie("token", token).json("ok");
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
