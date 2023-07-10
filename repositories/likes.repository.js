const { Likes } = require("../models");
const { Posts } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("sequelize")

class LikesRepository {
    checkPost = async (postId) => {
        const checkPost = await Posts.findOne({ where: { postId } });
        return checkPost
    }
    likePostId = async (userId) => {
        const postIdArray = await Likes.findAll({
            attributes: ['PostId'],
            where: {
                UserId: userId
            }
        });
        const likePostIdList = postIdArray.map((like) => like.PostId);
        return likePostIdList
    }
    likePosts = async (likePostId) => {
        const likePosts = await Posts.findAll({
            attributes: [
                'postId',
                'UserId',
                'nickname',
                'title',
                [sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'like']
            ],
            include: [
                {
                    model: Likes,
                    attributes: []
                }
            ],
            where: {
                postId: {
                    [sequelize.Op.or]: likePostId
                }
            },
            group: ['Posts.postId'],
            order: [[sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'DESC']],
            raw: true
        });
        return likePosts
    }
    likesOnOff = async (userId, postId) => {
        const like = await Likes.findOne({
            where: {
                [Op.and]: [{ UserId: userId }, [{ PostId: postId }]]
            }
        })
        if (!like) {
            const likeOn = await Likes.create({ UserId: userId, PostId: postId });
            return likeOn
        } else {
            const likeOff = await Likes.destroy({
                where: {
                    [Op.and]: [{ UserId: userId }, [{ PostId: postId }]]
                }
            })
            return likeOff
        }
    }


}

module.exports = LikesRepository;