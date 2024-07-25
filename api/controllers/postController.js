const fs = require("fs");

exports.createPost = async (req, res) => {
  const { originalname } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = req.file.path + "." + extension

  fs.renameSync(req.file.path, newPath)
  res.json({ extension });
};
