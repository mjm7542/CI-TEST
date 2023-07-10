const { Users, Posts, Comments } = require("../models");

class CommentsRepository {
    // 게시글 확인
    checkPost = async (postId) => {
        const checkPost = await Posts.findOne({ where: { postId } });
        return checkPost
    }
    checkComment = async (commentId) => {
        const checkComment = await Comments.findOne({ where: { commentId } })
        console.log(commentId)
        console.log(checkComment)
        return checkComment
    }

    // 댓글 조회
    findAllComments = async (postId) => {
        try {
            const posts = await Posts.findOne({ where: { postId: postId } })
            if (!posts) { }
            const commentsData = await Comments.findAll({
                where: { PostId: postId },
                attributes: [
                    'commentId',
                    'UserId',
                    'comment',
                    'createdAt',
                    'updatedAt',
                ],
                include: [{
                    model: Users,
                    attributes: ['nickname']
                }],
                group: ['commentId'],
                raw: true
            });
            return commentsData
        } catch (err) {
            console.error(err)
        }
    }
    // 댓글 생성
    createComment = async (userId, postId, comment) => {
        const posts = await Posts.findOne({ where: { postid: postId } })
        if (!posts) { }
        const createComment = await Comments.create({
            UserId: userId,
            PostId: postId,
            comment: comment
        });
        return createComment
    }
    // 댓글 수정
    updateComment = async (commentId, comment,) => {
        const updateCommentStatus = await Comments.update(
            { comment },
            { where: { commentId } }
        );
        return updateCommentStatus
    }
    // 댓글 삭제
    deleteComment = async (commentId, postId, userId) => {
        const posts = await Posts.findOne({ where: { postid: postId } })
        if (!posts) { }
        const comments = await Comments.findOne({ where: { commentId: commentId } })
        if (!comments) { }
        const deleteCommentStatus = await Comments.destroy(
            { where: { commentId } }
        );
        return deleteCommentStatus
    }

}

module.exports = CommentsRepository