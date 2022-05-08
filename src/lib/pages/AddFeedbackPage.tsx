import React, { useEffect, useState, } from 'react';
import { Button } from '../components/Button';
import { useAddComment } from '../hooks/useAddComment';
import { Category, KaitakuProps } from '../types/types';
import { Error } from '../components/Error'
import { Success } from '../components/Success';

export interface Props extends KaitakuProps {
    onGoBack: () => void
    showAddFeedback: Category
}

export const AddFeedbackPage = (
    props: Props,
) => {

    const {
        error: createCommentError,
        isLoading: isCreateCommentLoading,
        status: createCommentStatus,
        mutate: createComment
    } = useAddComment()

    const [comment, setComment] = useState('')
    const goBack = () => {
        props.onGoBack()
    }
    const onSubmit = () => {
        if (comment.length < 5) {
            return
        }
        createComment({
            categoryId: props.showAddFeedback.id,
            comment: comment,
            projectId: props.projectId,
            token: props.token,
            userId: props.userId,
        })
    }

    useEffect(() => {
        if (createCommentStatus !== 'success') {
            return
        }
        props.onGoBack()
    }, [createCommentStatus])

    return (
        <>
            <div className="kt-overflow-y-auto kt-h-full kt-max-h-[400px] ">
                <div
                    className="kt-border-b-2 kt-border-slate-100"  >
                    <div className="kt-p-2 kt-text-left kt-flex kt-items-center kt-gap-2 border-indigo-500 kt-rounded-xl ">
                        <span className="kt-text-gray-400 kt-text-base">Feature Request {'>'} Add Feedback</span>
                    </div>
                </div>

                <div className="kt-flex kt-flex-col kt-items-center kt-space-y-4">
                    <p className="kt-mt-2 kt-text-sm kt-text-gray-500 kt-text-center kt-w-5/6"
                        data-testid="add-feedback-category-description">
                        {props.showAddFeedback.description || ''}
                    </p>
                    <textarea
                        className="kt-border-2 kt-rounded-md kt-w-full kt-h-24 kt-px-4"
                        data-testid="add-feedback-comment-input"
                        onChange={e => setComment(e.target.value)}
                        rows={4}
                        value={comment}
                    />

                    {
                        createCommentError && <Error />
                    }
                    {
                        createCommentStatus === 'success' && <Success title={'Thank you for your feedback!'} />
                    }
                    <Button
                        dataTestId='add-feedback-comment-submit'
                        loading={isCreateCommentLoading}
                        onClick={onSubmit}
                        title="Submit"
                        type='primary' />
                    <Button
                        dataTestId='add-feedback-comment-cancel'
                        onClick={goBack}
                        title="Cancel"
                        type='discourage' />
                </div>
            </div>
        </>
    )
}
