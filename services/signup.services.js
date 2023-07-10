const SignupRepository = require('../repositories/signup.repository');

class SignupService {
    signupRepository = new SignupRepository()

    createUesrs = async (nickname, password, confirm) => {
        try {
            const regex = /[^a-zA-Z0-9]/g;
            //! 닉네임 비밀번호 미입력
            if (!nickname || !password || !confirm) {
                return {
                    status: 400,
                    errorMessage: "닉네임 또는 비밀번호를 입력하지 않았습니다"
                }
            }
            //! 닉네임 형식이 비정상적인 경우
            if (nickname.length < 3 || nickname.search(regex) !== -1) {
                return {
                    status: 412,
                    errorMessage: "닉네임의 형식이 일치하지 않습니다."
                }
            }
            //! 패스워드 형식이 비정상적인 경우
            if (password.length < 4) {
                return {
                    status: 412,
                    errorMessage: "패스워드 형식이 일치하지 않습니다."
                }
            }
            //! 패스워드에 닉네임이 포함되어 있는지 여부
            if (password.includes(nickname)) {
                return {
                    status: 412,
                    errorMessage: "패스워드에 닉네임이 포함되어 있습니다."
                }
            }
            //! 패스워드 일치 확인
            if (password !== confirm) {
                return {
                    status: 412,
                    errorMessage: "패스워드가 일치하지 않습니다."
                }
            }
            //! 닉네임 중복 확인 
            const nicknameDoubleCheck = await this.signupRepository.nicknameDoubleCheck(nickname)
            if (nicknameDoubleCheck) {
                return {
                    status: 412,
                    errorMessage: "중복된 닉네임입니다."
                }
            }

            const createUesrsData = await this.signupRepository.createUesrs(nickname, password)
            return createUesrsData
        } catch (err) {
            console.error(err)
        }
    }
}
module.exports = SignupService;