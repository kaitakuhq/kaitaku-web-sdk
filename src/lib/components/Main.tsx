import React from 'react';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { ListCategoryPage } from '../pages/ListCategoryPage';
import { KaitakuProps } from '../types/types';
import './../../style/generated.css'

const queryClient = new QueryClient()

export const Kaitaku = (props: KaitakuProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="kt-drop-shadow-xl kt-bg-white kt-rounded-2xl kt-shadow-xl kt-shadow-blue-500/50">
                <ListCategoryPage
                    {...props} />
            </div>
        </QueryClientProvider>
    )
}
