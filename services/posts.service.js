
const PostRepository = require('../repositories/posts.repository');

class PostService {
    postRepository = new PostRepository();

    // 게시글 전체 조회
    findAllPost = async () => {
        const postsAllData = await this.postRepository.findAllPost();
        return postsAllData
    }
    // 게시글 생성
    createPost = async (UserId, nickname, title, content) => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        const createPostData = await this.postRepository.createPost(UserId, nickname, title, content);

        return {
            postId: createPostData.null,
            UserId: createPostData.UserId,
            nickname: createPostData.nickname,
            title: createPostData.title,
            content: createPostData.content,
            createdAt: createPostData.createdAt,
            updatedAt: createPostData.updatedAt,
        };
    }
    // 게시글 상세 조회
    findOnePost = async (postId) => {
        const postOneData = this.postRepository.findOnePost(postId)
        return postOneData
    }
    // 게시글 수정
    updatePost = async (postId) => {
        const updatePostData = this.postRepository.updatePost(postId)
        return updatePostData
    }
    // 게시글 삭제
    destroyPost = async (postId) => {
        const deletePostData = this.postRepository.deletePost(postId)
        return deletePostData
    }
}

module.exports = PostService;