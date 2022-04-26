import { Comment, HttpResponse } from "../types/types"
import { makeRequest } from "./common"

export const listComment = (
    projectId: string,
    categoryId: string,
    token: string,
): Promise<Comment[]> => {
    if (!projectId || !categoryId || !token) {
        return new Promise(resolve => resolve([]))
    }
    return makeRequest<Comment[]>(`/project/${projectId}/category/${categoryId}/comment`, token)
}
