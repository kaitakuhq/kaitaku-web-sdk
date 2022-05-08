import React, { useEffect, useState } from 'react';
import {
    QueryClientProvider,
} from 'react-query'
import { EditIcon } from '../icons/EditIcon';
import { XIcon } from '../icons/XIcon';
import { AddFeedbackPage } from '../pages/AddFeedbackPage';
import { ListCategoryPage } from '../pages/ListCategoryPage';
import { Category, KaitakuProps } from '../types/types';
import { queryClient } from '../util/queryClient';
import './../../style/generated.css'

export const MainComponent = (props: KaitakuProps) => {

    const {
        showFeedbackButton: _showFeedbackButton,
        showFeedbackUI: _showFeedbackUI,
    } = props

    const [showFeedbackUI, setShowFeedbackUI] = useState(false)

    // showFeedbackButton defaults to true
    const [showFeedbackButton, setShowFeedbackButton] = useState(true)

    useEffect(() => {
        if (_showFeedbackUI === undefined) {
            return
        }
        setShowFeedbackUI(_showFeedbackUI)
    }, [_showFeedbackUI])

    useEffect(() => {
        if (_showFeedbackButton === undefined) {
            return
        }
        setShowFeedbackButton(_showFeedbackButton)
    }, [_showFeedbackButton])

    const [showAddFeedback, setShowAddFeedback] = useState<Category | null>(null)

    return (
        <QueryClientProvider client={queryClient}>
            <div id="kaitaku-feedback-container" style={{ height: '100%' }}>
                {
                    showFeedbackUI === true && (
                        <div className="kt-drop-shadow-md kt-bg-white kt-rounded-2xl kt-shadow-md kt-h-full kt-flex">
                            <div className="kt-p-2 kt-py-4 kt-max-w-[400px] kt-w-full">
                                <div className="kt-flex kt-px-2 kt-mb-2 kt-justify-end">
                                    <div className='kt-cursor-pointer' onClick={() => setShowFeedbackUI(false)}>
                                        <XIcon
                                            width={'18px'}
                                            height={'18px'}
                                            stroke={'gray'} />
                                    </div>
                                </div>
                                {
                                    showAddFeedback
                                        ? null
                                        : (
                                            <ListCategoryPage
                                                {...props}
                                                onAddFeedback={setShowAddFeedback}
                                            />
                                        )
                                }
                                {
                                    showAddFeedback && (
                                        <AddFeedbackPage
                                            onGoBack={() => setShowAddFeedback(null)}
                                            showAddFeedback={showAddFeedback}
                                            {...props} />
                                    )
                                }
                            </div>
                        </div>
                    )
                }

                {
                    (showFeedbackUI === false && showFeedbackButton === true) && (
                        <div id="kaitaku-ui-trigger-button"
                            data-testid="kaitaku-ui-trigger-button"
                            className="kt-fixed kt-bottom-5 kt-right-5 kt-rounded-full kt-border-2 kt-border-white kt-bg-blue-600 kt-flex kt-justify-center kt-items-center kt-cursor-pointer kt"
                            onClick={() => setShowFeedbackUI(!showFeedbackUI)}
                            style={{
                                height: '64px',
                                width: '64px',
                            }}>
                            <div className='kt-fill-blue-500'>
                                <EditIcon
                                    height='36px'
                                    width='36px'
                                    stroke="white" />
                            </div>
                        </div>
                    )
                }
            </div>
        </QueryClientProvider>
    )
}
