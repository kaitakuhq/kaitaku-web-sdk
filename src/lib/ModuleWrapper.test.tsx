
jest.mock('./components/Main', () => ({
  MainComponent: jest.fn((props) => {
    return JSON.stringify(props, null, 2)
  })
}));

import { act, waitFor, } from '@testing-library/react';
import { kaitakuProps } from '../testutil/testdata';
import { Kaitaku, } from './ModuleWrapper';
import { MainComponent, } from './components/Main';
import * as component from './components/Main';
import { KaitakuProps } from './types';
import Cookies from 'universal-cookie'

describe('<ModuleWrapper />', () => {

  let mainComponentSpy: jest.SpyInstance

  const createClass = (override?: Partial<KaitakuProps>) => {
    const props = {
      ...kaitakuProps,
      ...override,
    }
    return new Kaitaku(props)
  }

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    mainComponentSpy = jest.spyOn(component, 'MainComponent')
  })

  afterEach(() => {
    mainComponentSpy.mockRestore()
  })

  it('should render', async () => {

    await act(() => {
      createClass();
    });
  })

  describe('userid', () => {

    it('generate user ID if not set', async () => {
      await act(() => {
        createClass({
          userId: undefined,
        });
      });

      await waitFor(() => {
        expect(!!(MainComponent as jest.Mock).mock.calls[0][0].userId).toBe(true)
        expect(!!(MainComponent as jest.Mock).mock.calls[0][0].userId).not.toBe('user-1234')
      })

      // check set 
      const cookie = new Cookies()
      expect(cookie.get('kaitakuUserId')).toBe((MainComponent as jest.Mock).mock.calls[0][0].userId)
    })

    it('generate user ID from cookie if set', async () => {

      const cookies = new Cookies()
      cookies.set('kaitakuUserId', 'xyzuserid1')

      await act(() => {
        createClass({
          userId: undefined,
        });
      });

      await waitFor(() => {
        expect((MainComponent as jest.Mock).mock.calls[0][0].userId).toBe('xyzuserid1')
        expect(!!(MainComponent as jest.Mock).mock.calls[0][0].userId).not.toBe('user-1234')
      })
    })

    it('use a specified user ID if set', async () => {

      const cookies = new Cookies()
      cookies.set('kaitakuUserId', 'xyzuserid1')

      await act(() => {
        createClass({
          userId: 'user-1234',
        });
      });

      await waitFor(() => {
        expect((MainComponent as jest.Mock).mock.calls[0][0].userId).toBe('user-1234')
      })
    })
  })
})
