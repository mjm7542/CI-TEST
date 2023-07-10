
const LoginRepository = require('../repositories/login.repository');
const jwt = require("jsonwebtoken");

class LoginService {
    LoginRepository = new LoginRepository

    loginUesrs = async (nickname, password) => {
        try {
            if (!nickname || !password) {
                return {
                    status: 412,
                    errorMessage: "닉네임과 패스워드를 입력해주세요."
                }
            }
            const user = await this.LoginRepository.loginUesrs(nickname)

            //! 닉네임 비밀번호 확인 
            if (!user || password !== user.password) {
                return {
                    status: 412,
                    errorMessage: "닉네임 또는 패스워드를 확인해주세요."
                }
            }
            const token = jwt.sign(
                { userId: user.userId, nickname: user.nickname },
                "customized_secret_key"
            );
            return token

        } catch (err) {
            console.error(err)
        }
    }
}
module.exports = LoginService;