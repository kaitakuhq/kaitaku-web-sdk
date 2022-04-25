import { Comment, HttpResponse } from "../types/types"
import { makeRequest } from "./common"

export const listComment = (
    projectId: string,
    categoryId: string,
    token: string,
): Promise<Comment[]> => {
    return makeRequest<Comment[]>(`/project/${projectId}/category/${categoryId}/comment`, token)
}
