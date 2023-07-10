const PostsService = require('../services/posts.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
    postsService = new PostsService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

    // 게시글 전체 조회
    getPostsAll = async (req, res, next) => {
        try {
            const postAll = await this.postsService.findAllPost();

            //! 에러가 있을 경우 응답 
            if (postAll.status) {
                return res
                    .status(postAll.status)
                    .json({ errorMessage: postAll.errorMessage })
            }

            res.status(200).json({ data: postAll })

        } catch {
            return res
                .status(400)
                .json({ errorMessage: "게시글 조회에 실패하였습니다." })
        }
    }
    // 게시글 생성
    createPost = async (req, res, next) => {
        try {
            const { userId, nickname } = res.locals.user;
            const { title, content } = req.body;

            const createPostData = await this.postsService.createPost(userId, nickname, title, content);

            //! 에러가 있을 경우 응답 
            if (createPostData.status) {
                return res
                    .status(createPostData.status)
                    .json({ errorMessage: createPostData.errorMessage })
            }

            res.status(201).json({ data: createPostData });

        } catch {
            return res
                .status(400)
                .json({ errorMessage: "게시글 생성에 실패하였습니다." })
        }
    }
    // 게시글 상세 조회
    getPostsOne = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const postOne = await this.postsService.findOnePost(postId)
            //! 에러가 있을 경우 응답 
            if (postOne.status) {
                return res
                    .status(postOne.status)
                    .json({ errorMessage: createPostData.errorMessage })
            }
            res.status(200).json({ data: postOne });

        } catch {
            return res
                .status(400)
                .json({ errorMessage: "게시글 상세 조회에 실패하였습니다." })
        }
    }
    // 게시글 수정 
    putPost = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user;
            const { postId } = req.params;
            const { title, content } = req.body;

            const updatePostData = await this.postsService.updatePost(title, content, postId, nickname)

            //! 에러가 있을 경우 응답 
            if (updatePostData.status) {
                return res
                    .status(updatePostData.status)
                    .json({ errorMessage: updatePostData.errorMessage })
            }

            res.status(200).json({ message: "게시글을 수정하였습니다" });

        } catch {
            return res
                .status(400)
                .json({ errorMessage: "게시글 수정에 실패하였습니다." })
        }
    }
    // 게시글 삭제
    deletePost = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user;
            const { postId } = req.params;
            const deletePostStatus = await this.postsService.destroyPost(nickname, postId);

            //! 에러가 있을 경우 응답 
            if (deletePostStatus.status) {
                return res
                    .status(deletePostStatus.status)
                    .json({ errorMessage: deletePostStatus.errorMessage })
            }

            res.status(200).json({ message: "게시글을 삭제하였습니다" });

        } catch {
            return res
                .status(401)
                .json({ errorMessage: "게시글이 정상적으로 삭제되지 않았습니다." });
        }
    }

}
module.exports = PostsController;