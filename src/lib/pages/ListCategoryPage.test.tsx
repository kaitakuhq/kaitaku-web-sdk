
jest.mock('../api/listCategory', () => ({
  listCategory: jest.fn(),
}));

import { render, waitFor, } from '@testing-library/react';
import { ListCategoryPage } from './ListCategoryPage';
import { WrappedQueryClient } from '../../testutil/clientProvider';
import * as category from "../api/listCategory";
import { listCategory } from "../api/listCategory";
import { KaitakuProps } from '../types/types';

describe('<ListCategoryPage />', () => {

  let listCategorySpy: jest.SpyInstance;

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
  });

  afterEach(() => {
    listCategorySpy.mockRestore()
    jest.clearAllMocks();
  });

  it("Renders and get category list", async () => {
    renderPage()

    await waitFor(() => {
      expect(listCategorySpy).toHaveBeenCalledWith('proj-1234', 'token')
    })
  });

  describe('onError', () => {
    it('should return onError if unauthorized', async () => {
      (listCategory as jest.Mock).mockReturnValue(
        new Promise(resolve => {
          resolve({
            data: undefined,
            code: 'UNAUTHORIZED',
            status: 401,
          })
        })
      );

      const onError = jest.fn()
      renderPage({ onError })

      await waitFor(() => {
        expect(onError).toHaveBeenCalled()
      })
    })
  })
})
