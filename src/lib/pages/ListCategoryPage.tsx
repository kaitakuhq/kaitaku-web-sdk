import React, { useEffect, useState, } from 'react';
import { useListCategory } from '../hooks/useListCategory';
import { useListComment } from '../hooks/useListComment';
import { NewKaitakuError } from '../types/error';
import { Category, KaitakuProps } from '../types/types';

const comments = [
    {
        comment: 'Navigation is not usable'
    },
    {
        comment: 'Set the destination on the map'
    },
    {
        comment: 'Voice announcements are difficult to hear'
    },
    {
        comment: 'Navigation is not usable'
    },
    {
        comment: 'Set the destination on the map'
    },
    {
        comment: 'Voice announcements are difficult to hear'
    },
]

export const ListCategoryPage = (
    props: KaitakuProps,
) => {
    const {
        data: categoryList,
        error,
        status,
        isLoading,
    } = useListCategory({
        token: props.token,
        projId: props.projectId,
    })

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

    useListComment({
        categoryId: selectedCategory?.id || '',
        projectId: props.projectId,
        token: props.token,
    })

    // auto select first category
    useEffect(() => {
        if ((categoryList?.length || 0) < 1) {
            return
        }
        if (selectedCategory) {
            return
        }
        setSelectedCategory(categoryList![0])
    }, [categoryList])

    // send back onError if error occurs
    useEffect(() => {
        if (!error) {
            return
        }
        props.onError(
            NewKaitakuError(error)
        )
    }, [error])

    return (
        <div className="kt-p-2 kt-py-4 kt-max-w-[400px] kt-w-full ">
            <div className="kt-grid kt-grid-flow-col kt-overflow-x-auto kt-pb-2 kt-border-b-2 kt-border-slate-100">
                {
                    (categoryList || []).map((c) => (
                        <div className="kt-p-2 kt-cursor-pointer justify-center items-center ">
                            <span className="kt-whitespace-nowrap kt-align-baseline kt-text-center hover:kt-border-b-2 kt-border-blue-500 kt-text-gray-400 hover:kt-text-gray-900 kt-text-lg">{c.name}</span>
                        </div>
                    ))
                }
            </div>
            <div className="kt-overflow-y-auto kt-h-full kt-max-h-[300px] ">
                {
                    (comments || []).map((c) => (
                        <div className="kt-border-b-2 kt-border-slate-100">
                            <div className="kt-p-2 kt-text-left kt-flex kt-items-center kt-gap-2 border-indigo-500 kt-rounded-xl kt-cursor-pointer">
                                <div className="kt-grid kt-justify-center kt-gap-0">
                                    <svg className="kt-fill-gray-400 hover:kt-fill-blue-500 kt-w-8 kt-h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                                    <span className="kt-text-center kt-text-gray-600 kt-text-base">3</span>
                                </div>
                                <span className="kt-text-gray-400 hover:kt-text-gray-600 kt-text-base">{c.comment}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
