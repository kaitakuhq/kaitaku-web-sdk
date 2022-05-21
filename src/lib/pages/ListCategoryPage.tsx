import React, { useEffect, useMemo, useState, } from 'react';
import { Button } from '../components/Button';
import { Category } from '../components/Category';
import { Comment } from '../components/Comment';
import { Spinner } from '../components/Spinner';
import { useGetProject } from '../hooks/useGetProject';
import { useListComment } from '../hooks/useListComment';
import { NewKaitakuError } from '../types/error';
import { Category as ICategory, Category as CategoryProps, KaitakuProps } from '../types/types';
import empty from './../icons/empty.svg'
import warning from './../icons/warning.svg'

interface Props extends KaitakuProps {
    onAddFeedback: (category: CategoryProps | null) => void
}

export const ListCategoryPage = (
    props: Props,
) => {
    const {
        data: categoryList,
        error: listCategoryError,
        status: categoryListStatus,
        isLoading: isLoadingProject,
    } = useGetProject({
        token: props.token,
        projId: props.projectId,
    })

    const [selectedCategory, setSelectedCategory] = useState<CategoryProps | null>(null)

    const filteredCategoryObj: { key: number, list: ICategory[] } = useMemo(() => {
        const list = (categoryList?.category || []).filter(v => v.active === true)
        return {
            // key is used for other objects to listen to state change
            key: new Date().getTime(),
            list: list,
        }
    }, [categoryListStatus])

    const categoryNotSetup = categoryListStatus === 'success'
        && (filteredCategoryObj.list.length || []) < 1

    const onCategoryClick = (category: CategoryProps) => {
        setSelectedCategory(category)
    }

    const {
        data: comments,
        error: listCommentError,
        isLoading: isLoadingComments,
    } = useListComment({
        categoryId: selectedCategory?.id || '',
        projectId: props.projectId,
        token: props.token,
        userId: props.userId,
    })

    // did mount
    useEffect(() => {
        if (!props.projectId || !props.token || !props.userId) {
            throw new Error("`projectId`, `token`, and `userId` are required")
        }
    }, [])

    // auto select first category
    useEffect(() => {
        if (filteredCategoryObj.list.length < 1) {
            return
        }
        if (selectedCategory) {
            return
        }
        setSelectedCategory(filteredCategoryObj.list[0]!)
    }, [filteredCategoryObj.key])

    const error = listCategoryError || listCommentError

    // send back onError if error occurs
    useEffect(() => {
        if (!error) {
            return
        }
        props.onError(
            NewKaitakuError(error)
        )
    }, [error])

    const onAddFeedback = () => {
        props.onAddFeedback(selectedCategory)
    }

    const renderError = () => {
        return (
            <div className="kt-p-12 kt-flex kt-flex-col kt-items-center kt-h-full kt-justify-center"
                data-testid={`error-occurred`}>
                <span className="kt-w-24 kt-h-24 kt-mb-4">
                    <img src={warning} alt="No Data" />
                </span>
                <span className="kt-text-gray-400  kt-text-xl">
                    Oops... something went wrong!
                </span>
            </div>
        )
    }
    const renderNoProjectSetup = () => {
        return (
            <div className="kt-p-12 kt-flex kt-flex-col kt-items-center kt-h-full kt-justify-center"
                data-testid={`project-not-setup`}>
                <span className="kt-w-24 kt-h-24 kt-mb-4">
                    <img src={empty} alt="No Data" />
                </span>
                <span className="kt-text-gray-400  kt-text-xl">
                    This project is not setup yet...
                </span>
            </div>
        )
    }

    if (isLoadingProject) {
        return <Spinner />
    }

    if (error) {
        return renderError()
    }

    if (categoryNotSetup === true) {
        return renderNoProjectSetup()
    }

    return (
        <>
            <div className="kt-grid kt-grid-flow-col kt-overflow-x-auto">
                {
                    filteredCategoryObj.list.map((c) => (
                        <Category
                            key={c.id}
                            category={c}
                            onCategoryClick={onCategoryClick}
                            selectedCategory={selectedCategory} />
                    ))
                }
            </div>
            <p
                className="kt-mb-2 kt-text-sm kt-text-gray-500 kt-pl-2 kt-pt-2 kt-text-center"
                data-testid="list-category-item-description">
                {selectedCategory?.description || ''}
            </p>
            <div className='kt-border-b-2 kt-border-slate-100'>
            </div>
            {
                isLoadingComments
                    ? <Spinner />
                    : (
                        <>
                            <div className="kt-overflow-y-auto kt-h-full kt-max-h-[290px] ">
                                {
                                    (comments || []).map((c) => <Comment {...props} key={c.id} comment={c} />)
                                }
                                {
                                    ((comments || []).length < 1) && (
                                        <div>
                                            <div className="kt-p-2 kt-text-center">
                                                <span className="kt-text-gray-300 kt-text-sm">No Comments for {selectedCategory?.name}</span>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>

                            <div
                                className="kt-m-2">
                                <Button
                                    onClick={onAddFeedback}
                                    title={'Add New Feedback'}
                                    type={'primary'} />
                            </div>
                        </>
                    )
            }
        </>
    )
}
