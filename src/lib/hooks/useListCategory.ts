
import { useQuery } from "react-query";
import { listCategory } from "../api/listCategory";
import { HTTPError, } from "../types/error";
import { Category, } from "../types/types";

interface ListCategoryArg {
    projId: string
    token: string
}

export const useListCategory = (arg: ListCategoryArg) => {
    const cacheKey = [
        'listCategory',
        arg.projId,
        arg.token]

    return useQuery<unknown, HTTPError, Category[]>(cacheKey,
        async () => listCategory(arg.projId, arg.token), {
        retry: false
    })
}