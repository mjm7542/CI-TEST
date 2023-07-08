const { Users } = require("../models");

class SignupRepository {

    createUesrs = async (nickname, password) => {
        try {
            const createUesrsData = await Users.create({ nickname, password });
            return createUesrsData
        } catch (err) {
            console.error(err)
            return res
                .status(400)
                .json({ errormessage: "저장소에서 에러 발생" })
        }
    }
}


module.exports = SignupRepository;