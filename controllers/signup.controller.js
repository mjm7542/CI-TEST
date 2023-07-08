const SignupService = require('../services/signup.services');

class SignupController {
    SignupService = new SignupService()

    createUesrs = async (req, res, next) => {
        try {
            const { nickname, password, confirm } = req.body;
            const createUesrsData = await this.SignupService.createUesrs(nickname, password, confirm);
            return res.status(201).json({ message: "회원가입이 완료되었습니다." });
        } catch (err) {
            console.error(err)
            return res
                .status(400)
                .json({ errormessage: "컨트롤러에서 에러 발생" })
        }
    }
}

module.exports = SignupController;