const PostService = require('../services/posts.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
    postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

    // 게시글 전체 조회
    getPostsAll = async (req, res, next) => {
        const postAll = await this.postService.findAllPost();

        res.status(200).json({ data: postAll })
    }
    // 게시글 생성
    createPost = async (req, res, next) => {
        const { userId, nickname } = res.locals.user;
        const { title, content } = req.body;
        const createPostData = await this.postService.createPost(userId, nickname, title, content);

        res.status(201).json({ data: createPostData });
    }
    // 게시글 상시 조회
    getPostsOne = async (req, res, next) => {
        const { postId } = req.params;
        const postOne = await this.postService.findOnePost(postId)

        res.status(200).json({ data: postOne });
    }
    // 게시글 수정 
    putPost = async (req, res, next) => {
        const { nickname } = res.locals.user;
        const { postId } = req.params;
        const { title, content } = req.body;

        const updatePostData = await this.postService.updatePost(title, content, postId, nickname)

        if (updatePostData) {
            return res.status(200).json({ message: "게시글을 수정하였습니다" });
        } else {
            return res
                .status(401)
                .json({ errorMessage: "게시글이 정상적으로 수정되지 않았습니다." });
        }
    }
    // 게시글 삭제
    deletePost = async (req, res, next) => {
        const { nickname } = res.locals.user;
        const { postId } = req.params;
        const [deletePostStatus] = await this.Posts.destroyPost(nickname, postId);
        if (deletePostStatus) {
            return res.status(200).json({ message: "게시글을 삭제하였습니다" });
        } else {
            return res
                .status(401)
                .json({ errorMessage: "게시글이 정상적으로 삭제되지 않았습니다." });
        }
    }

}
module.exports = PostsController;