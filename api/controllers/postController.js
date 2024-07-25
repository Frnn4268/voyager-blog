const fs = require("fs");

const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const { originalname } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = req.file.path + "." + extension;

  fs.renameSync(req.file.path, newPath);

  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  });

  res.json(postDoc);
};
