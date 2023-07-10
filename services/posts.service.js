
const PostRepository = require('../repositories/posts.repository');

class PostService {
    postRepository = new PostRepository();

    // 게시글 전체 조회
    findAllPost = async () => {
        const postsAllData = await this.postRepository.findAllPost();
        if (!postsAllData) {
            return {
                status: 400,
                errorMessage: "조회할 게시글이 없습니다."
            }
        }
        return postsAllData
    }
    // 게시글 생성
    createPost = async (UserId, nickname, title, content) => {
        //! title 혹은 content를 입력받지 못한 경우
        if (!title || !content) {
            return {
                status: 400,
                errorMessage: "게시글 제목과 내용을 입력해주세요"
            }
        }
        //! title의 형식이 비정상적인 경우
        if (title.length > 25) {
            return {
                status: 412,
                errorMessage: "게시글 제목은 25자 미만으로 입력해주세요"
            }
        }
        //! content의 형식이 비정상적인 경우
        if (content.length > 1000) {
            return {
                status: 412,
                errorMessage: "게시글 내용은 1000자 미만으로 입력해주세요."
            }
        }
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
        if (!postOneData) {
            return {
                status: 400,
                errorMessage: "게시글을 찾지 못하였습니다."
            }
        }
        return postOneData
    }
    // 게시글 수정
    updatePost = async (title, content, postId, nickname) => {
        try {
            if (!title || !content) {
                return {
                    status: 400,
                    errorMessage: "변경할 게시글 제목과 내용을 입력해주세요."
                }
            }
            //! title의 형식이 비정상적인 경우
            if (!title || title.length > 25) {
                return res
                    .status(412)
                    .json({ errorMessage: "게시글 제목은 25자 이하로 입력해주세요" });
            }
            //! content의 형식이 비정상적인 경우
            if (!content || content.length > 1000) {
                return {
                    status: 412,
                    errorMessage: "게시글 내용은 1000자 미만으로 입력해주세요."
                }
            }
            //! 게시글 확인
            const checkPost = await this.postRepository.checkPost(postId)
            if (!checkPost) {
                return {
                    status: 401,
                    errorMessage: "게시글이 존재하지 않습니다."
                }
            }
            //! 유저 권한 확인
            if (nickname !== checkPost.nickname) {
                return {
                    status: 403,
                    errorMessage: "게시글 수정의 권한이 존재하지 않습니다."
                }
            }
            const updatePostData = this.postRepository.updatePost(title, content, postId)

            //! 게시글 수정 중 문제 발생
            if (!updatePostData) {
                return {
                    status: 401,
                    errorMessage: "게시글이 정상적으로 수정되지 않았습니다."
                }
            }
            return updatePostData
        } catch (err) {
            console.error(err)
        }
    }
    // 게시글 삭제
    destroyPost = async (nickname, postId) => {
        const checkPost = await this.postRepository.checkPost(postId)
        //! 게시글 확인
        if (!checkPost) {
            return {
                status: 401,
                errorMessage: "게시글이 존재하지 않습니다."
            }
        }
        //! 유저 권한 확인
        if (nickname !== checkPost.nickname) {
            return {
                status: 403,
                errorMessage: "게시글 수정의 권한이 존재하지 않습니다."
            }
        }
        const deletePostData = this.postRepository.deletePost(nickname, postId)

        //! 게시글 삭제 중 문제 발생
        if (!deletePostData) {
            return {
                status401,
                errorMessage: "게시글이 정상적으로 수정되지 않았습니다."
            }
        }
        return deletePostData
    }
}

module.exports = PostService;