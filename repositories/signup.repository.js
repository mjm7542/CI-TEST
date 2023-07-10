const { Users } = require("../models");

class SignupRepository {
    nicknameDoubleCheck = async (nickname) => {
        try {
            const user = await Users.findOne({ where: { nickname } });
            if (user) {
                return true
            }
            return false
        } catch (err) {
            console.error(err)
        }
    }
    createUesrs = async (nickname, password) => {
        try {
            const createUesrsData = await Users.create({ nickname, password });
            return createUesrsData
        } catch (err) {
            console.error(err)
        }
    }
}


module.exports = SignupRepository;