
jest.mock('../api/createComment', () => ({
  createComment: jest.fn(),
}));

import { fireEvent, render, screen, waitFor, } from '@testing-library/react';
import { AddFeedbackPage, Props } from './AddFeedbackPage';
import { WrappedQueryClient } from '../../testutil/clientProvider';
import * as comment from "../api/createComment";
import {
  category,
  comment as commentData,
} from '../../testutil/testdata'
import { createComment } from "../api/createComment";
import userEvent from '@testing-library/user-event';
import { NewHttpError } from '../types/error';

describe('<AddFeedbackPage />', () => {

  let createCommentSpy: jest.SpyInstance;

  const renderPage = (override?: Partial<Props>) => {
    const props = {
      projectId: 'proj-1234',
      onGoBack: () => { },
      onError: () => { },
      onSubmitComment: () => { },
      showAddFeedback: category[0],
      token: 'token',
      userId: 'user-1234',

      ...override,
    }
    return render(
      <WrappedQueryClient>
        <AddFeedbackPage {...props} />
      </WrappedQueryClient>
    );
  }

  beforeEach(() => {
    createCommentSpy = jest.spyOn(comment, 'createComment')
  });

  afterEach(() => {
    createCommentSpy.mockRestore()
    jest.clearAllMocks();
  });

  it("renders", async () => {
    renderPage()

    await waitFor(() => {
      expect(createCommentSpy).not.toHaveBeenCalled()
    })
  });

  it('should not call add comments if no text is entered', async () => {
    renderPage()

    const submit = await screen.findByTestId('add-feedback-comment-submit')
    fireEvent.click(submit)

    await waitFor(() => {
      expect(createCommentSpy).not.toHaveBeenCalled()
    })
  })

  it('should call create comment if text is longer than 5 characters', async () => {
    (createComment as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        resolve(commentData[0])
      })
    });

    const onGoBackFn = jest.fn()

    renderPage({
      onGoBack: onGoBackFn,
    })

    const input = await screen.findByTestId('add-feedback-comment-input')

    userEvent.type(input, 'aaa')

    const submit = await screen.findByTestId('add-feedback-comment-submit')
    fireEvent.click(submit)

    await waitFor(() => {
      expect(createCommentSpy).not.toHaveBeenCalled()
    })

    userEvent.type(input, 'aaabbbb')

    fireEvent.click(submit)

    await waitFor(() => {
      expect(createCommentSpy).toHaveBeenCalledWith(
        'proj-1234',
        category[0].id,
        'user-1234',
        'aaaaaabbbb',
        'token',
      )
    })
    const errMsg = await screen.queryByTestId('success-message')
    expect(errMsg).not.toBeNull()

    expect(onGoBackFn).toHaveBeenCalled()
  })

  it('should show error if error has occurred', async () => {
    (createComment as jest.Mock).mockImplementation(() => {
      return new Promise(() => {
        const err = NewHttpError({
          status: 'Unauthorized',
        })
        throw err
      })
    });

    const onError = jest.fn()
    const onGoBackFn = jest.fn()

    renderPage({
      onGoBack: onGoBackFn,
      onError,
    })

    const errMsg = await screen.queryByTestId('error-message')
    expect(errMsg).toBeNull()

    const input = await screen.findByTestId('add-feedback-comment-input')
    userEvent.type(input, 'aaabbbb')

    const submit = await screen.findByTestId('add-feedback-comment-submit')
    fireEvent.click(submit)

    await waitFor(() => {
      expect(createCommentSpy).toHaveBeenCalledWith(
        'proj-1234',
        category[0].id,
        'user-1234',
        'aaabbbb',
        'token',
      )
    })

    const msg = await screen.findByTestId('error-message')
    expect(msg).not.toBeNull()

    expect(onGoBackFn).not.toHaveBeenCalled()
  })
})
