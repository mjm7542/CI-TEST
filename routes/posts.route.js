const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PostsController = require('../controllers/posts.controller');

const postsController = new PostsController();

router.get('/', postsController.getPostsAll);
router.post('/', authMiddleware, postsController.createPost);
router.get("/:postId", authMiddleware, postsController.getPostsOne);
router.put('/:postId', authMiddleware, postsController.putPost);
router.delete('/:postId', authMiddleware, postsController.deletePost);

module.exports = router;