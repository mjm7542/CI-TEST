const LoginService = require('../services/login.service');

class Logincontroller {
    LoginService = new LoginService()

    loginUesrs = async (req, res, next) => {
        try {
            const { nickname, password } = req.body;
            const loginToken = await this.LoginService.loginUesrs(nickname, password);

            //! 에러가 있을 경우 응답 
            if (loginToken.status) {
                return res
                    .status(loginToken.status)
                    .json({ errorMessage: loginToken.errorMessage })
            }

            //? 정상적인 경우
            res.cookie("authorization", "Bearer " + loginToken);
            res.status(200).json({ loginToken });

        } catch (err) {
            console.error(err)
            return res
                .status(400)
                .json({ errormessage: "로그인에 실패하였습니다." })
        }
    }
}

module.exports = Logincontroller;