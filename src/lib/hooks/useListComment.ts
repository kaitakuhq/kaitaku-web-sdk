
import { useQuery } from "react-query";
import { listComment } from "../api/listComment";
import { HTTPError } from "../types/error";
import { Comment, HttpResponse } from "../types/types";

interface ListCommentArg {
    categoryId: string
    projectId: string
    token: string
}

export const useListComment = (arg: ListCommentArg) => {
    const cacheKey = [
        'listComment',
        arg.projectId,
        arg.categoryId,
        arg.token]

    return useQuery<unknown, HTTPError, HttpResponse<Comment[]>>(cacheKey,
        () => listComment(
            arg.projectId,
            arg.categoryId,
            arg.token,
        ))
}