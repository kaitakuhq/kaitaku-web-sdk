import React, { useEffect, } from 'react';
import { useListCategory } from '../hooks/useListCategory';
import { KaitakuProps } from '../types/types';

export const ListCategoryPage = (
    props: KaitakuProps,
) => {
    const {
        data,
        error,
        status,
        isLoading,
    } = useListCategory({
        token: props.token,
        projId: props.projectId,
    })

    useEffect(() => {
        if (!data) {
            return
        }
        if (data.status !== 'OK') {
            props.onError({
                name: 'Error',
                message: '',
                customCode: data.code || '',
                customMsg: data.error || ''
            })
        }
    }, [data?.status])

    useEffect(() => {
        if (!error) {
            return
        }
        props.onError({
            name: 'Error',
            message: '',
            customCode: data?.code || '',
            customMsg: data?.error || ''
        })
    }, [error])

    return (
        <div>
            {
                (data?.data || []).map(() => (
                    <div>Categrddddfffdory 341</div>
                ))
            }
            {/* {
                commentResp.comments.map(v = (
                    <div>{v.categoryId}</div>
                    ))
                } */}
            <div>Hello f</div>
        </div>
    )
}
