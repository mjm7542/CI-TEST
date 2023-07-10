const SignupService = require('../services/signup.services');

class SignupController {
    SignupService = new SignupService()

    createUesrs = async (req, res, next) => {
        try {
            const { nickname, password, confirm } = req.body;

            const createUesrsData = await this.SignupService.createUesrs(nickname, password, confirm);

            //! 에러가 있을 경우 응답 
            if (createUesrsData.status) {
                return res
                    .status(createUesrsData.status)
                    .json({ errorMessage: createUesrsData.errorMessage })
            }

            //? 정상적인 경우
            return res.status(201).json({ message: "회원가입이 완료되었습니다." });
        } catch (err) {
            console.error(err)
            return res
                .status(400)
                .json({ errorMessage: "회원가입에 실패하였습니다." })
        }
    }
}

module.exports = SignupController;