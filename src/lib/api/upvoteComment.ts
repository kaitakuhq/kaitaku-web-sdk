import { Comment, } from "../types/types"
import { makeRequest } from "./common"

export const upvoteComment = (
    projectId: string,
    categoryId: string,
    commentId: string,
    userId: string,
    upvoted: boolean,
    token: string,
): Promise<Comment | null> => {
    if (!projectId || !categoryId || !token || !userId) {
        return new Promise(resolve => resolve(null))
    }
    return makeRequest<Comment | null>(
        `/project/${projectId}/category/${categoryId}/comment/${commentId}/vote`,
        token, {
        method: 'PUT',
        body: JSON.stringify({
            user_voted: upvoted,
            user_id: userId,
        })
    })
}
