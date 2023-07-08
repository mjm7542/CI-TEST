const LoginService = require('../services/login.service');

class Logincontroller {
    LoginService = new LoginService()

    loginUesrs = async (req, res, next) => {
        try {
            const { nickname, password } = req.body;
            const token = await this.LoginService.loginUesrs(nickname, password);

            res.cookie("authorization", "Bearer " + token);
            res.status(200).json({ token });

        } catch (err) {
            console.error(err)
            return res
                .status(400)
                .json({ errormessage: "컨트롤러에서 에러 발생" })
        }
    }
}

module.exports = Logincontroller;