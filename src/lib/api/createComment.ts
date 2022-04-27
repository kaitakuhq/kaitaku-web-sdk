import { Comment, } from "../types/types"
import { makeRequest } from "./common"

export const createComment = (
    projectId: string,
    categoryId: string,
    userId: string,
    comment: string,
    token: string,
): Promise<Comment | null> => {
    if (!projectId || !categoryId || !token || !userId) {
        return new Promise(resolve => resolve(null))
    }
    return makeRequest<Comment | null>(
        `/project/${projectId}/category/${categoryId}/comment?user_id=` + userId,
        token, {
        method: 'POST',
        body: JSON.stringify({
            comment: comment,
            user_id: userId,
        })
    })
}
