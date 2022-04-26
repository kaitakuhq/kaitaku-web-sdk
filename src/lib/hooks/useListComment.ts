
import { useQuery } from "react-query";
import { listComment } from "../api/listComment";
import { HTTPError } from "../types/error";
import { Comment, } from "../types/types";

interface ListCommentArg {
    categoryId: string
    projectId: string
    token: string
    userId: string
}

export const useListComment = (arg: ListCommentArg) => {
    const cacheKey = [
        'listComment',
        arg.projectId,
        arg.categoryId,
        arg.token,
        arg.userId,]

    return useQuery<unknown, HTTPError, Comment[]>(cacheKey,
        () => listComment(
            arg.projectId,
            arg.categoryId,
            arg.userId,
            arg.token,
        ), {
        retry: false
    })
}