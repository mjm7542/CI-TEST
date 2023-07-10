const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const CommentsController = require('../controllers/comments.controller');

const commentsController = new CommentsController();

router.get('/:postId/comments', commentsController.getCommentsAll);
router.post('/:postId/comments', authMiddleware, commentsController.createComment);
router.put('/:postId/comments/:commentId', authMiddleware, commentsController.putComment);
router.delete('/:postId/comments/:commentId', authMiddleware, commentsController.deleteComment);


module.exports = router;