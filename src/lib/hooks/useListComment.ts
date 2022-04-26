
import { useQuery } from "react-query";
import { listComment } from "../api/listComment";
import { HTTPError } from "../types/error";
import { Comment, } from "../types/types";

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

    return useQuery<unknown, HTTPError, Comment[]>(cacheKey,
        () => listComment(
            arg.projectId,
            arg.categoryId,
            arg.token,
        ), {
        retry: false
    })
}