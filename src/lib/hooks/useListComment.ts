
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
        async () => {
            const comments = await listComment(
                arg.projectId,
                arg.categoryId,
                arg.userId,
                arg.token,
            )
            return (comments || []).slice().sort((a, b) => {
                return b.votes - a.votes
            })
        }, {
        retry: false
    })
}