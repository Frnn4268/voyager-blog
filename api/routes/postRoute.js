const express = require("express");
const router = express.Router();
const multer = require("multer");

const postController = require("../controllers/postController");

const uploadMiddleware = multer({ dest: "uploads/" });

router.get("/post", postController.getPost);
router.post(
  "/post",
  uploadMiddleware.single("file"),
  postController.createPost
);

module.exports = router;
