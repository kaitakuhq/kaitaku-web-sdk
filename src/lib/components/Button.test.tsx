
jest.mock('../api/createComment', () => ({
  createComment: jest.fn(),
}));

import { fireEvent, render, screen, waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, } from './Button';

describe('<Button />', () => {

  let createCommentSpy: jest.SpyInstance;

  it("title shows", async () => {
    const onClick = jest.fn();
    render(<Button
      dataTestId={'button'}
      onClick={onClick}
      title={'button'}
      type={'primary'}
    />)

    const button = screen.getByTestId('button')

    userEvent.click(button)

    await waitFor(() => {
      expect(onClick).toHaveBeenCalled()
    })
  });

  it("onClick works", async () => {
    const onClick = jest.fn();
    render(<Button
      dataTestId={'button'}
      onClick={onClick}
      title={'button'}
      type={'primary'}
    />)

    const button = screen.getByTestId('button')
    expect(button.textContent).toEqual('button')
  });

  it("onClick disabled if loading or disabled", async () => {

    const onClick = jest.fn();
    const { rerender } = render(<Button
      dataTestId={'button'}
      loading={true}
      onClick={onClick}
      title={'button'}
      type={'primary'}
    />)

    let button = screen.getByTestId('button')

    userEvent.click(button)

    await waitFor(() => {
      expect(onClick).not.toHaveBeenCalled()
    })


    rerender(<Button
      dataTestId={'button'}
      disabled={true}
      onClick={onClick}
      title={'button'}
      type={'primary'}
    />)

    button = screen.getByTestId('button')

    userEvent.click(button)

    await waitFor(() => {
      expect(onClick).not.toHaveBeenCalled()
    })

  });

})
