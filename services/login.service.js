
const LoginRepository = require('../repositories/login.repository');
const jwt = require("jsonwebtoken");

class LoginService {
    LoginRepository = new LoginRepository

    loginUesrs = async (nickname, password) => {
        try {
            // 서비스에서 비밀번호 확인 및 에러처리 대부분
            const user = await this.LoginRepository.loginUesrs(nickname)
            // 확인 후 토큰을 리턴한다
            if (!user || password !== user.password) {
                res.status(412).json({
                    errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
                });
                return;
            }
            const token = jwt.sign(
                { userId: user.userId, nickname: user.nickname },
                "customized_secret_key"
            );
            return token

        } catch (err) {
            console.error(err)
            return res
                .status(400)
                .json({ errormessage: "서비스에서 에러 발생" })
        }
    }
}
module.exports = LoginService;