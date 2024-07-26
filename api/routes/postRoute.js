const express = require("express");
const router = express.Router();
const multer = require("multer");

const postController = require("../controllers/postController");

const uploadMiddleware = multer({ dest: "uploads/" });

router.get("/post", postController.getPost);
router.get("/post/:id", postController.getPostById);
router.get("/top-users", postController.getTopUsers);
router.post(
  "/post",
  uploadMiddleware.single("file"),
  postController.createPost
);
router.put(
  "/post",
  uploadMiddleware.single("file"),
  postController.updatePost
);

module.exports = router;
