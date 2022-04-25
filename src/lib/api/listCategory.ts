import { Category, HttpResponse } from "../types/types"
import { makeRequest } from "./common"

export const listCategory = (
    projectId: string,
    token: string,
): Promise<Category[]> => {
    return makeRequest<Category[]>(`/project/${projectId}/category`, token)
}
