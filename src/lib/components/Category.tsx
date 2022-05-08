import * as React from "react"
import { Category as CategoryProp, Comment as IComment, KaitakuProps } from "../types/types"

export interface Props {
    category: CategoryProp
    onCategoryClick: (category: CategoryProp) => void
    selectedCategory: CategoryProp | null
}

export const selectedClasses = 'kt-border-b-2 kt-border-blue-500 kt-text-gray-400 kt-text-gray-900 kt-text-base kt-font-medium'
export const nonSelectedClasses = ' kt-text-gray-400 hover:kt-text-gray-900 kt-text-base'

export const Category = (props: Props) => {

    const {
        category: c,
        selectedCategory,
    } = props

    return (
        <div className="kt-p-2 kt-cursor-pointer kt-justify-center kt-items-center kt-text-center hover:kt-bg-slate-100 hover:kt-rounded"
            data-testid={`category-${c.id}`}
            key={c.id}
            // @ts-ignore
            onClick={() => props.onCategoryClick(c)}>
            <span className={"kt-whitespace-nowrap kt-align-baseline kt-text-center " + (selectedCategory?.id === c.id ? selectedClasses : nonSelectedClasses)}
                data-testid={`category-text-${c.id}`}
            >{c.name}</span>
        </div>
    )
}