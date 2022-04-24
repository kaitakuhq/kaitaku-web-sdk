
import { useQuery } from "react-query";
import { listCategory } from "../api/listCategory";
import { Category, HttpResponse } from "../types/types";

interface ListCategoryArg {
    projId: string
    token: string
}

export const useListCategory = (arg: ListCategoryArg) => {
    return useQuery<unknown, HttpResponse<undefined>, HttpResponse<Category[]>>('listCategory',
        () => listCategory(arg.projId, arg.token))
}