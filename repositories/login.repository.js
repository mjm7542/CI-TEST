const { Users } = require("../models");

class LoginRepository {

    loginUesrs = async (nickname) => {
        try {
            const user = await Users.findOne({ where: { nickname } });
            return user
        } catch (err) {
            console.error(err)
        }
    }
}


module.exports = LoginRepository;