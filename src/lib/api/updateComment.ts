import { Comment, } from "../types/types"
import { makeRequest } from "./common"

export const updateComment = (
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
        `/project/${projectId}/category/${categoryId}/comment/${commentId}`,
        token, {
        method: 'PUT',
        body: JSON.stringify({
            upvoted: upvoted,
            user_id: userId,
        })
    })
}
