const CommentsService = require('../services/comments.service');


class CommentsCsontroller {
    commentsService = new CommentsService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

    // 댓글 전체 조회
    getCommentsAll = async (req, res, next) => {
        const { postId } = req.params;

        const commentAll = await this.commentsService.findAllComments(postId);
        //! 에러가 있을 경우 응답 
        if (commentAll.status) {
            return res
                .status(commentAll.status)
                .json({ errorMessage: commentAll.errorMessage })
        }

        res.status(200).json({ data: commentAll })
    }
    // 댓글 생성
    createComment = async (req, res, next) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;
        const { comment } = req.body;

        const createCommentData = await this.commentsService.createComment(userId, postId, comment);
        //! 에러가 있을 경우 응답 
        if (createCommentData.status) {
            return res
                .status(createCommentData.status)
                .json({ errorMessage: createCommentData.errorMessage })
        }

        res.status(201).json({ data: createCommentData });
    }
    // 댓글 수정 
    putComment = async (req, res, next) => {
        const { postId, commentId } = req.params;
        console.log(postId, commentId)
        const { comment } = req.body;
        const { userId } = res.locals.user;

        const updateCommentData = await this.commentsService.updateComment(userId, postId, commentId, comment)

        //! 에러가 있을 경우 응답 
        if (updateCommentData.status) {
            return res
                .status(updateCommentData.status)
                .json({ errorMessage: updateCommentData.errorMessage })
        }

        return res.status(200).json({ message: "댓글을 수정하였습니다" });

    }
    // 댓글 삭제
    deleteComment = async (req, res, next) => {
        const { postId, commentId } = req.params;
        const { userId } = res.locals.user;

        const deleteCommentStatus = await this.commentsService.deleteComment(userId, postId, commentId);
        //! 에러가 있을 경우 응답 
        if (deleteCommentStatus.status) {
            return res
                .status(deleteCommentStatus.status)
                .json({ errorMessage: deleteCommentStatus.errorMessage })
        }
        if (deleteCommentStatus) {
            return res.status(200).json({ message: "댓글을 삭제하였습니다" });
        } else {
            return res
                .status(401)
                .json({ errorMessage: "댓글이 정상적으로 삭제되지 않았습니다." });
        }
    }

}
module.exports = CommentsCsontroller;