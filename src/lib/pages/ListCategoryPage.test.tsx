
jest.mock('../api/listCategory', () => ({
  listCategory: jest.fn(),
  listComment: jest.fn(),
}));

import { fireEvent, render, screen, waitFor, } from '@testing-library/react';
import { ListCategoryPage } from './ListCategoryPage';
import { WrappedQueryClient } from '../../testutil/clientProvider';
import * as category from "../api/listCategory";
import * as comment from "../api/listComment";
import {
  category as categoryData,
  comment as commentData,
} from './../../testutil/testdata'
import { listCategory } from "../api/listCategory";
import { listComment } from "../api/listComment";
import { KaitakuProps } from '../types/types';
import { KaitakuErrorCode, NewHttpError } from '../types/error';

describe('<ListCategoryPage />', () => {

  let listCategorySpy: jest.SpyInstance;
  let listCommentSpy: jest.SpyInstance;

  const renderPage = (override?: Partial<KaitakuProps>) => {
    const props = {
      projectId: 'proj-1234',
      onError: () => { },
      token: 'token',
      ...override,
    }
    return render(
      <WrappedQueryClient>
        <ListCategoryPage {...props} />
      </WrappedQueryClient>
    );
  }

  beforeEach(() => {
    listCategorySpy = jest.spyOn(category, 'listCategory')
    listCommentSpy = jest.spyOn(comment, 'listComment')
  });

  afterEach(() => {
    listCategorySpy.mockRestore()
    listCommentSpy.mockRestore()
    jest.clearAllMocks();
  });

  it("Renders and get category list", async () => {
    renderPage()

    await waitFor(() => {
      expect(listCategorySpy).toHaveBeenCalledWith('proj-1234', 'token')
    })
  });

  it('should show project not setup if no categories are retrieved', async () => {
    (listCategory as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        resolve([])
      })
    });
    (listComment as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        resolve([])
      })
    });

    renderPage({
      projectId: 'proj-4156789'
    })

    const element = await screen.findByTestId('project-not-setup')

    await waitFor(() => {
      expect(element).toBeVisible()
    })
  })

  it('should return onError if unauthorized', async () => {
    (listCategory as jest.Mock).mockImplementation(() => {
      return new Promise(() => {
        const err = NewHttpError({
          code: 'Unauthorized',
        })
        throw err
      })
    });

    const onError = jest.fn()
    renderPage({ onError })

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(expect.objectContaining({
        code: KaitakuErrorCode.Unauthorized,
      }))
    })

    const element = await screen.findByTestId('error-occurred')

    await waitFor(() => {
      expect(element).toBeVisible()
    })
  })

  it('should call get comments if category is autoselected', async () => {
    (listCategory as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        resolve(categoryData)
      })
    });
    (listComment as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        resolve(commentData)
      })
    });

    const onError = jest.fn()
    renderPage({
      onError,
      projectId: 'proj-5678'
    })

    await waitFor(() => {
      expect(onError).not.toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(listCommentSpy).toHaveBeenCalledWith('proj-5678', 'category-1', 'token')
    })
  })

  it('should call get comments if another category is selected', async () => {
    (listCategory as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        resolve(categoryData)
      })
    });
    (listComment as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        resolve(commentData)
      })
    });

    const onError = jest.fn()
    renderPage({
      onError,
      projectId: 'proj-56789'
    })


    await waitFor(() => {
      expect(listCommentSpy).toHaveBeenCalledWith('proj-56789', 'category-1', 'token')
    })

    const element = await screen.findByTestId('category-category-2')
    fireEvent.click(element)

    await waitFor(() => {
      expect(listCommentSpy).toHaveBeenCalledWith('proj-56789', 'category-2', 'token')
    })
  })
})
