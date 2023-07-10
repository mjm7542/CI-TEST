const CommentsRepository = require('../repositories/comments.repository');

class CommentsService {
    CommentsRepository = new CommentsRepository();

    // 댓글 전체 조회
    findAllComments = async (postId) => {
        try {
            const checkPost = await this.CommentsRepository.checkPost(postId)
            //! 게시글 확인 
            if (!checkPost) {
                return {
                    status: 404,
                    errorMessage: "게시글이 존재하지 않습니다."
                }
            }
            const commentsData = await this.CommentsRepository.findAllComments(postId)

            //? 댓글 조건에 맞게 보여주기
            const comments = commentsData.map((comment) => {
                return {
                    commentId: comment.commentId,
                    UserId: comment.UserId,
                    nickname: comment['User.nickname'],
                    comment: comment.comment,
                    createdAt: comment.createdAt,
                    updatedAt: comment.updatedAt
                }
            })

            return comments
        } catch (err) {
            console.error(err)
        }
    }
    // 댓글 생성
    createComment = async (userId, postId, comment) => {
        try {
            //! 게시글 내용이 없을 때 
            if (!comment)
                return {
                    status: 412,
                    errorMessage: "댓글 내용을 입력해주세요"
                }
            //! 게시글 확인 
            const checkPost = await this.CommentsRepository.checkPost(postId)
            if (!checkPost) {
                return {
                    status: 404,
                    errorMessage: "게시글이 존재하지 않습니다."
                }
            }
            const createCommentData = await this.CommentsRepository.createComment(userId, postId, comment);
            return createCommentData;
        } catch (err) {
            console.error(err)
        }
    }
    // 댓글 수정
    updateComment = async (userId, postId, commentId, comment) => {
        try {
            //! 댓글 내용이 없을 때 
            if (!comment)
                return {
                    status: 412,
                    errorMessage: "댓글 내용을 입력해주세요"
                }
            //! 게시글 확인 
            const checkPost = await this.CommentsRepository.checkPost(postId)
            if (!checkPost) {
                return {
                    status: 404,
                    errorMessage: "게시글이 존재하지 않습니다."
                }
            }
            //! 댓글 확인
            const checkComment = await this.CommentsRepository.checkComment(commentId)
            if (!checkComment) {
                return {
                    status: 404,
                    errorMessage: "수정할 댓글이 존재하지 않습니다."
                }
            }
            //! 유저 권한 확인 
            if (userId !== checkComment.UserId) {
                return {
                    status: 403,
                    errorMessage: "댓글의 수정 권한이 존재하지 않습니다."
                }
            }

            const updateCommentData = await this.CommentsRepository.updateComment(commentId, comment)

            //! 댓글 수정 중 문제 발생
            if (!updateCommentData) {
                return {
                    status: 400,
                    errorMessage: "댓글 수정이 정상적으로 처리되지 않았습니다."
                }
            }
            return updateCommentData
        } catch (err) {
            console.error(err)
        }
    }
    // 댓글 삭제
    deleteComment = async (userId, postId, commentId) => {
        //! 게시글 확인 
        const checkPost = await this.CommentsRepository.checkPost(postId)
        if (!checkPost) {
            return {
                status: 404,
                errorMessage: "게시글이 존재하지 않습니다."
            }
        }
        //! 댓글 확인
        const checkComment = await this.CommentsRepository.checkComment(commentId)
        if (!checkComment) {
            return {
                status: 404,
                errorMessage: "삭제할 댓글이 존재하지 않습니다."
            }
        }
        //! 유저 권한 확인 
        if (userId !== checkComment.UserId) {
            return {
                status: 403,
                errorMessage: "댓글의 삭제 권한이 존재하지 않습니다."
            }
        }

        const deleteCommenttData = await this.CommentsRepository.deleteComment(userId, postId, commentId)

        //!  댓글 삭제 중 문제 발생
        if (!deleteCommenttData) {
            return {
                status: 400,
                errorMessage: "댓글 삭제가 정상적으로 처리되지 않았습니다."
            }
        }

        return deleteCommenttData
    }
}

module.exports = CommentsService;