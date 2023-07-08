const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PostsController = require('../controllers/posts.controller');

const postsController = new PostsController();

router.get('/', postsController.getPostsAll);
router.post('/', authMiddleware, postsController.createPost);
router.get("/:postId", authMiddleware, postsController.createPost);
router.put('/:postId', authMiddleware, postsController.createPost);
router.delete('/:postId', authMiddleware, postsController.createPost);

module.exports = router;