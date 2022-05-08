

jest.mock('../pages/ListCategoryPage', () => ({ ListCategoryPage: () => 'ListCategoryPage page' }));
jest.mock('../pages/AddFeedbackPage', () => ({ AddFeedbackPage: () => 'AddFeedbackPage page' }));

import { render, screen, waitFor, } from '@testing-library/react';
import { WrappedQueryClient } from '../../testutil/clientProvider';
import { kaitakuProps } from '../../testutil/testdata';
import { MainComponent, } from './Main';
import { KaitakuProps } from '../types';


describe('<Main />', () => {

    const renderPage = (override?: Partial<KaitakuProps>) => {
        const props = {
            ...kaitakuProps,
            ...override,
        }
        return render(
            <WrappedQueryClient>
                <MainComponent {...props} />
            </WrappedQueryClient>
        );
    }

    const renderPageWithFn = (renderer: Function, override?: Partial<KaitakuProps>) => {
        const props = {
            ...kaitakuProps,
            ...override,
        }
        return renderer(
            <WrappedQueryClient>
                <MainComponent {...props} />
            </WrappedQueryClient>
        );
    }

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should render', async () => {
        renderPage()

        await waitFor(() => {
            const element = screen.getByTestId('kaitaku-ui-trigger-button')
            expect(element).not.toBeNull()
        })
    })

    it('should not default button if showFeedbackButton=false', async () => {
        const {
            rerender,
        } = renderPage({
            showFeedbackButton: false,
        })

        await waitFor(() => {
            const element = screen.queryByTestId('kaitaku-ui-trigger-button')
            expect(element).toBeNull()
        })

        renderPageWithFn(rerender, {
            showFeedbackButton: true,
        })

        await waitFor(() => {
            const element = screen.getByTestId('kaitaku-ui-trigger-button')
            expect(element).not.toBeNull()
        })
    })

})
