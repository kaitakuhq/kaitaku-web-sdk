
import { fireEvent, render, screen, waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as commentList from "../api/updateComment";
import { WrappedQueryClient } from '../../testutil/clientProvider';
import { category, comment, kaitakuProps } from '../../testutil/testdata';
import { Category, nonSelectedClasses, Props, selectedClasses } from './Category';

describe('<Category />', () => {

    const renderPage = (override?: Partial<Props>) => {
        const props = {
            comment: comment[0],
            selectedCategory: null,
            category: category[0],
            onCategoryClick: () => { },
            ...override,
        }
        return render(
            <Category {...props} />
        );
    }


    it("show category", async () => {
        renderPage()

        const element = screen.getByTestId('category-' + category[0].id)
        expect(element).not.toBeNull()
    });

    it("show selected state for category", async () => {
        renderPage({
            selectedCategory: category[0],
        })

        const element = screen.getByTestId('category-text-' + category[0].id)
        selectedClasses.split(' ').forEach(str => {
            expect(element.classList.contains(str)).toBe(true)
        })
    });

    it("show non-selected state for category", async () => {
        renderPage({
            selectedCategory: null,
        })

        const element = screen.getByTestId('category-text-' + category[0].id)
        nonSelectedClasses.split(' ').forEach(str => {
            expect(element.classList.contains(str)).toBe(true)
        })
    });

})
