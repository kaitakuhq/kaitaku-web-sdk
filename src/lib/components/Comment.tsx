import { useMemo } from "react"
import { useUpvoteComment } from "../hooks/useUpvoteComment"
import { Comment as IComment, KaitakuProps } from "../types/types"
import chevron from './../icons/chevron.svg'
import { Spinner } from "./Spinner"

export interface Props extends KaitakuProps {
    comment: IComment
}

export const Comment = (props: Props) => {

    const {
        comment,
    } = props

    const {
        mutate: upvoteComment,
        isLoading,
    } = useUpvoteComment()

    const onUpvote = (c: IComment) => {
        if (isLoading) {
            return
        }
        upvoteComment({
            ...props,
            categoryId: c.categoryId,
            commentId: c.id,
            upvoted: !c.userVoted,
        })
    }

    const userVoteClass = useMemo(() => {
        switch (comment.userVoted) {
            case true:
                return 'kt-bg-blue-100'
            case false:
                return 'hover:kt-bg-gray-100'
        }
    }, [comment.userVoted])

    return (
        <div className="kt-border-b-2 kt-border-slate-100">
            <div className="kt-py-1 kt-text-left kt-flex kt-items-center kt-gap-2 border-indigo-500 kt-rounded-xl kt-cursor-pointer">
                <div className={"kt-rounded-lg kt-grid kt-justify-center kt-gap-0 kt-p-2 " + userVoteClass}
                    data-testid={'comment-vote-box'}
                    onClick={() => onUpvote(comment)}
                >
                    {
                        isLoading === true
                            ? <Spinner />
                            : (<>
                                <div>
                                    <img src={chevron} className={"kt-w-3 kt-h-3"} />
                                </div>

                                <span className="kt-text-center kt-text-gray-600 kt-text-base"
                                    data-testid="comment-vote-count"
                                >{comment.votes}</span>
                            </>)
                    }
                </div>
                <span className="kt-text-gray-400 hover:kt-text-gray-600 kt-text-base"
                    data-testid="comment-text">{comment.comment}</span>
            </div>
        </div>
    )
}