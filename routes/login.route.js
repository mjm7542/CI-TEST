const express = require("express");
const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const router = express.Router();


// 로그인
router.post("/login", async (req, res) => {
    try {
        const { nickname, password } = req.body;
        const user = await Users.findOne({ where: { nickname } });

        //! 닉네임 혹은 패스워드 불일치
        if (!user || password !== user.password) {
            res.status(412).json({
                errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
            });
            return;
        }

        // JWT 생성
        const token = jwt.sign(
            { userId: user.userId, nickname: user.nickname },
            "customized_secret_key"
        );

        res.cookie("authorization", "Bearer " + token);
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            errorMessage: "로그인에 실패하였습니다.",
        });
    }
});


module.exports = router;