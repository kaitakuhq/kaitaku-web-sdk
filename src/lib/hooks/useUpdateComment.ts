
import { useMutation, } from "react-query";
import { updateComment } from "../api/updateComment";
import { HTTPError, } from "../types/error";
import { Comment } from "../types/types";
import { queryClient } from "../util/queryClient";

interface UpvoteCommentArg {
    categoryId: string
    commentId: string
    projectId: string
    token: string
    upvoted: boolean
    userId: string
}

export const useUpdateComment = () => {
    return useMutation<Comment | null, HTTPError, UpvoteCommentArg, unknown>(
        (arg: UpvoteCommentArg): Promise<Comment | null> =>
            updateComment(arg.projectId, arg.categoryId, arg.commentId, arg.userId, arg.upvoted, arg.token),
        {
            onSuccess: async (_, arg: UpvoteCommentArg) => {
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