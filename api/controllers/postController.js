const fs = require("fs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Post = require("../models/Post");

dotenv.config();

// Get all post
exports.getPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// Get post by id
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    if (!postDoc) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(postDoc);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

// Create post with cover image
exports.createPost = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File is required" });
  }

  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;

  try {
    fs.renameSync(path, newPath);
  } catch (error) {
    return res.status(500).json({ error: "Failed to rename file" });
  }

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    try {
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  });
};

// Update post with cover image
exports.updatePost = async (req, res) => {
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    try {
      fs.renameSync(path, newPath);
    } catch (error) {
      return res.status(500).json({ error: "Failed to rename file" });
    }
  }

  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Token must be provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    try {
      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);
      if (!postDoc) {
        return res.status(404).json({ error: "Post not found" });
      }
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(403).json({ error: "You are not the author of this post" });
      }

      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });
      res.json(postDoc);
    } catch (error) {
      res.status(500).json({ error: "Failed to update post" });
    }
  });
};