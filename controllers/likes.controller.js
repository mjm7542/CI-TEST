const Likeservice = require('../services/likes.services')

// Post의 컨트롤러(Controller)역할을 하는 클래스
class LikesController {
    likeservice = new Likeservice(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

    // 좋아요 게시글 조회

    likePosts = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const likePosts = await this.likeservice.findLikePosts(userId);

            //! 에러가 있을 경우 응답 
            if (likePosts.status) {
                return res
                    .status(likePosts.status)
                    .json({ errorMessage: likePosts.message })
            }

            res.status(200).json({ data: likePosts })
        } catch (err) {
            console.error(err);
            return res
                .status(400)
                .json({ errorMessage: "좋아요한 게시글 조회에 실패하였습니다." });
        }
    }

    // 게시글 좋아요
    likesOnOff = async (req, res, next) => {

        try {
            const { userId } = res.locals.user;
            const { postId } = req.params;

            const likesOnOff = await this.likeservice.likesOnOff(userId, postId);

            //! 에러가 있을 경우 응답 
            if (likesOnOff.status) {
                return res
                    .status(likesOnOff.status)
                    .json({ errorMessage: likesOnOff.errorMessage })
            }
            console.log(typeof (likesOnOff) === "object")
            if (typeof (likesOnOff) === "object") {
                return res
                    .status(200)
                    .json({ Message: "게시글의 좋아요를 등록하였습니다." });
            } else {
                return res
                    .status(200)
                    .json({ Message: "게시글의 좋아요를 취소하였습니다." });
            }
        } catch (err) {
            console.error(err);
            return res
                .status(400)
                .json({ errorMessage: "게시글 좋아요에 실패하였습니다." });
        }
    }

}
module.exports = LikesController;