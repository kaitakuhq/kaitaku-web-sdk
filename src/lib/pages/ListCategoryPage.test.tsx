
jest.mock('../api/getProject', () => ({
  getProject: jest.fn(),
  listComment: jest.fn(),
}));

import { fireEvent, render, screen, waitFor, } from '@testing-library/react';
import { ListCategoryPage } from './ListCategoryPage';
import { WrappedQueryClient } from '../../testutil/clientProvider';
import * as category from "../api/getProject";
import * as comment from "../api/listComment";
import {
  category as categoryData,
  comment as commentData,
} from './../../testutil/testdata'
import { getProject } from "../api/getProject";
import { listComment } from "../api/listComment";
import { KaitakuProps } from '../types/types';
import { KaitakuErrorCode, NewHttpError } from '../types/error';

describe('<ListCategoryPage />', () => {

  let getProjectSpy: jest.SpyInstance;
  let listCommentSpy: jest.SpyInstance;

  const renderPage = (override?: Partial<KaitakuProps>) => {
    const props = {
      projectId: 'proj-1234',
      onAddFeedback: () => { },
      onError: () => { },
      token: 'token',
      userId: 'user-1234',
      ...override,
    }
    return render(
      <WrappedQueryClient>
        <ListCategoryPage {...props} />
      </WrappedQueryClient>
    );
  }

  beforeEach(() => {
    getProjectSpy = jest.spyOn(category, 'getProject')
    listCommentSpy = jest.spyOn(comment, 'listComment')
  });

  afterEach(() => {
    getProjectSpy.mockRestore()
    listCommentSpy.mockRestore()
    jest.clearAllMocks();
  });

  it("Renders and get category list", async () => {
    renderPage()

    const element = await screen.findByTestId('spinner')
    expect(element).not.toBeNull()

    await waitFor(() => {
      expect(getProjectSpy).toHaveBeenCalledWith('proj-1234', 'token')
    })
  });

  it("throws if project id or token are not provided", async () => {
    const msg = '`projectId`, `token`, and `userId` are required'

    const testTable = [
      {
        projectId: '',
      }, {
        token: '',
      }, {
        userId: '',
      }
    ]

    testTable.forEach(t => {
      expect(() => renderPage(t))
        .toThrow(msg);
    })
  });

  it('should show project not setup if no categories are retrieved', async () => {
    (getProject as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        resolve({
          category: []
        })
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

  it('should only show active category', async () => {
    (getProject as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        resolve({
          category: [
            categoryData[0],
            {
              ...categoryData[1],
              active: false,
            }
          ]
        })
      })
    });

    (listComment as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        resolve([])
      })
    });

    renderPage({
      projectId: 'proj-56789'
    })


    await waitFor(() => {
      const element = screen.queryByTestId('category-category-1')
      expect(element).not.toBeNull()
      const element2 = screen.queryByTestId('category-category-2')
      expect(element2).toBeNull()
    })
  })

  it('should return onError if unauthorized', async () => {
    (getProject as jest.Mock).mockImplementation(() => {
      return new Promise(() => {
        const err = NewHttpError({
          status: 'Unauthorized',
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
    (getProject as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        resolve({
          category: categoryData
        })
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
      expect(listCommentSpy).toHaveBeenCalledWith('proj-5678', 'category-1', 'user-1234', 'token')
    })
  })

  it('should call get comments if another category is selected', async () => {
    (getProject as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        resolve({
          category: categoryData
        })
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
      projectId: 'proj-567891'
    })


    await waitFor(() => {
      expect(listCommentSpy).toHaveBeenCalledWith('proj-567891', 'category-1', 'user-1234', 'token')
    })

    const element = await screen.findByTestId('category-category-2')
    fireEvent.click(element)

    await waitFor(() => {
      expect(listCommentSpy).toHaveBeenCalledWith('proj-567891', 'category-2', 'user-1234', 'token')
    })
  })
})
