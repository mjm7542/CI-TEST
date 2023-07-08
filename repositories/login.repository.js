const { Users } = require("../models");

class LoginRepository {

    loginUesrs = async (nickname) => {
        try {
            const user = await Users.findOne({ where: { nickname } });
            return user
        } catch (err) {
            console.error(err)
            return res
                .status(400)
                .json({ errormessage: "저장소에서 에러 발생" })
        }
    }
}


module.exports = LoginRepository;