
jest.mock('../api/updateComment', () => ({
    updateComment: jest.fn(),
}));

import { fireEvent, render, screen, waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as commentList from "../api/updateComment";
import { WrappedQueryClient } from '../../testutil/clientProvider';
import { comment, kaitakuProps } from '../../testutil/testdata';
import { Comment, Props } from './Comment';

describe('<Comment />', () => {

    let updateCommentSpy: jest.SpyInstance;

    const renderPage = (override?: Partial<Props>) => {
        const props = {
            ...kaitakuProps,
            comment: comment[0],
            ...override,
        }
        return render(
            <WrappedQueryClient>
                <Comment {...props} />
            </WrappedQueryClient>
        );
    }

    beforeEach(() => {
        updateCommentSpy = jest.spyOn(commentList, 'updateComment')
    });

    afterEach(() => {
        updateCommentSpy.mockRestore()
        jest.clearAllMocks();
    });


    it("show render vote count and text", async () => {
        renderPage()

        const voteCount = screen.getByTestId('comment-vote-count')
        expect(voteCount.textContent).toBe('5')
        const text = screen.getByTestId('comment-text')
        expect(text.textContent).toBe(comment[0].comment)
    });

    it("show highlighted if voted", async () => {
        renderPage()

        const voteBox = screen.getByTestId('comment-vote-box')

        expect(voteBox.classList.contains('kt-bg-blue-100')).toBe(true)
        expect(voteBox.classList.contains('hover:kt-bg-gray-100')).toBe(false)
    });

    it("show not-highlighted if not-voted", async () => {
        renderPage({
            comment: {
                ...comment[0],
                userVoted: false,
            }
        })

        const voteBox = screen.getByTestId('comment-vote-box')

        expect(voteBox.classList.contains('kt-bg-blue-100')).toBe(false)
        expect(voteBox.classList.contains('hover:kt-bg-gray-100')).toBe(true)
    });

    it("show not-highlighted if not-voted", async () => {
        renderPage({
            comment: {
                ...comment[0],
                userVoted: false,
            }
        })

        const voteBox = screen.getByTestId('comment-vote-box')

        expect(voteBox.classList.contains('kt-bg-blue-100')).toBe(false)
        expect(voteBox.classList.contains('hover:kt-bg-gray-100')).toBe(true)
    });

    it('should call upvote if not upvoted', async () => {
        renderPage({
            comment: {
                ...comment[0],
                userVoted: false,
            }
        })

        const commentVoteBox = screen.getByTestId('comment-vote-box')
        userEvent.click(commentVoteBox)

        await waitFor(() => {
            expect(updateCommentSpy).toHaveBeenCalledWith(
                'proj-1234',
                comment[0].categoryId,
                comment[0].id,
                'user-1234',
                true,
                'token',
            )
        })
    })

    it('should call undo-upvote if upvoted', async () => {
        renderPage({
            comment: {
                ...comment[0],
                userVoted: true,
            }
        })

        const commentVoteBox = screen.getByTestId('comment-vote-box')
        userEvent.click(commentVoteBox)

        await waitFor(() => {
            expect(updateCommentSpy).toHaveBeenCalledWith(
                'proj-1234',
                comment[0].categoryId,
                comment[0].id,
                'user-1234',
                false,
                'token',
            )
        })
    })
})
