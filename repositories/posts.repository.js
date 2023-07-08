
const sequelize = require("sequelize")
const { Posts } = require('../models');

class PostRepository {
    // 게시글 전체 조회
    findAllPost = async () => {
        const posts = await Posts.findAll({
            attributes: [
                'postId',
                'userId',
                'nickname',
                'title',
                'createdAt',
                'updatedAt',
                [sequelize.fn('count', sequelize.col('Likes.PostId')), 'like']
            ],
            include: [{
                model: Likes,
                attributes: []
            }],
            group: ['postId'],
            order: [['postId', 'DESC']]
        });

        return posts;
    }
    // 게시글 생성
    createPost = async (UserId, nickname, title, content) => {
        const createPostData = await Posts.create({ UserId, nickname, title, content });

        return createPostData;
    }
    // 게시글 상세 조회
    findOnePost = async (postId) => {
        const posts = await Posts.findOne({
            attributes: [
                'postId',
                'userId',
                'nickname',
                'title',
                'createdAt',
                'updatedAt',
                [sequelize.fn('count', sequelize.col('Likes.PostId')), 'like']
            ],
            include: [
                {
                    model: Likes,
                    attributes: []
                }
            ],
            group: ['postId'],
            where: { postId: postId }
        });

        return posts
    }
    // 게시글 수정
    updatePost = async (postId) => {
        const [updatePostStatus] = await Posts.update(
            { title, content },
            { where: { postId } }
        )
        return updatePostStatus
    }
    // 게시글 삭제 
    deletePost = async (postId) => {
        const [deletePostStatus] = await Posts.destroy({ where: { postId } });
        return deletePostStatus
    }
}

module.exports = PostRepository;