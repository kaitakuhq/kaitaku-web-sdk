import { Category, HttpResponse } from "../types/types"
import { makeRequest } from "./common"

export const listCategory = (
    projectId: string,
    token: string,
): Promise<Category[]> => {
    if (!projectId || !token) {
        return new Promise(resolve => resolve([]))
    }
    return makeRequest<Category[]>(`/project/${projectId}/category`, token)
}
