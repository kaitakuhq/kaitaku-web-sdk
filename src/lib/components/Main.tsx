import React, { useState } from 'react';
import {
    QueryClientProvider,
} from 'react-query'
import { AddFeedbackPage } from '../pages/AddFeedbackPage';
import { ListCategoryPage } from '../pages/ListCategoryPage';
import { Category, KaitakuProps } from '../types/types';
import { queryClient } from '../util/queryClient';
import './../../style/generated.css'


export const Kaitaku = (props: KaitakuProps) => {

    const [showAddFeedback, setShowAddFeedback] = useState<Category | null>(null)
    return (
        <QueryClientProvider client={queryClient}>
            <div className="kt-drop-shadow-md kt-bg-white kt-rounded-2xl kt-shadow-md">
                <div className="kt-p-2 kt-py-4 kt-max-w-[400px] kt-w-full ">
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
        </QueryClientProvider>
    )
}
