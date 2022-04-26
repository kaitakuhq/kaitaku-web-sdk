
import { useQuery } from "react-query";
import { getProject } from "../api/getProject";
import { HTTPError, } from "../types/error";
import { Project, } from "../types/types";

interface ListCategoryArg {
    projId: string
    token: string
}

export const useGetProject = (arg: ListCategoryArg) => {
    const cacheKey = [
        'getProject',
        arg.projId,
        arg.token]

    return useQuery<unknown, HTTPError, Project | null>(cacheKey,
        async () => getProject(arg.projId, arg.token), {
        retry: false
    })
}