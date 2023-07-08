const express = require('express');
const router = express.Router();
const signupRouter = require("./signup.route");
const loginRouter = require("./login.route");
const postRouter = require('./posts.route');
const commentRouter = require('./comments.route');
const likesRouter = require('./likes.route');


// 홈페이지일 경우
router.get('/', (req, res) => {
    res.send("이제 왜 안됨?");
});
router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/posts', [likesRouter, postRouter, commentRouter,]); // 라우터 순서 중요함


module.exports = router;