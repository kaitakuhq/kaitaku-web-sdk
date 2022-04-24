import React, { useEffect, useState } from 'react';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { ListCategoryPage } from '../pages/ListCategoryPage';
import { KaitakuProps } from '../types/types';


// Create a client
const queryClient = new QueryClient()

export const Kaitaku = (props: KaitakuProps) => {

    return (
        <QueryClientProvider client={queryClient}>
            <ListCategoryPage
                {...props} />
        </QueryClientProvider>
    )
}
