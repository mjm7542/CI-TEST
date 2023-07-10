
const LikesRepository = require('../repositories/likes.repository');

class LikesService {
    likesRepository = new LikesRepository();

    findLikePosts = async (userId) => {
        try{
        const likePostId = await this.likesRepository.likePostId(userId);
        if (likePostId.length===0) {
            return {
                status: 200,
                message: "좋아요한 게시물이 없습니다."
            }
        }
        const findLikePosts = await this.likesRepository.likePosts(likePostId)
        return findLikePosts
    }catch(err){
        console.error(err)
    }
    }

    likesOnOff = async (userId, postId) => {
        try {
            const checkPost = await this.likesRepository.checkPost(postId)
            if (!checkPost) {
                return {
                    status: 401,
                    errorMessage: "게시글이 존재하지 않습니다."
                }
            }
            const findlikes = await this.likesRepository.likesOnOff(userId, postId)
            return findlikes
        } catch (err) {
            console.error(err)
        }
    }
}


module.exports = LikesService;