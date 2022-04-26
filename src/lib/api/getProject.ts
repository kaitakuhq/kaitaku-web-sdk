import { Project } from "../types/types"
import { makeRequest } from "./common"

export const getProject = (
    projectId: string,
    token: string,
): Promise<Project | null> => {
    if (!projectId || !token) {
        return new Promise(resolve => resolve(null))
    }
    return makeRequest<Project | null>(`/project/${projectId}`, token)
}
