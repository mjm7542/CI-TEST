const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const LikesController = require('../controllers/likes.controller');

const likesController = new LikesController();

router.get('/likes', authMiddleware, likesController.likePosts);
router.put('/:postId/likes', authMiddleware, likesController.likesOnOff);

module.exports = router;