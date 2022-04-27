
import { useMutation, useQuery } from "react-query";
import { createComment } from "../api/createComment";
import { getProject } from "../api/getProject";
import { HTTPError, } from "../types/error";
import { Comment } from "../types/types";
import { Project, } from "../types/types";
import { queryClient } from "../util/queryClient";

interface AddCommentArg {
    categoryId: string
    comment: string
    projectId: string
    token: string
    userId: string
}

export const useAddComment = () => {
    return useMutation<Comment | null, HTTPError, AddCommentArg, unknown>(
        (arg: AddCommentArg): Promise<Comment | null> => createComment(arg.projectId, arg.categoryId, arg.userId, arg.comment, arg.token),
        {
            onSuccess: async (_, arg: AddCommentArg) => {
                queryClient.invalidateQueries([
                    'listComment',
                    arg.projectId,
                    arg.categoryId,
                    arg.token,
                    arg.userId,])
            }
        }
    )
}