import * as react from 'react'
import { useMemo } from 'react'
import { Spinner } from './Spinner'

type ButtonType = 'primary' | 'discourage'

// @ts-ignore
interface Props {
    dataTestId?: string
    disabled?: boolean
    loading?: boolean
    onClick: () => void
    title: string
    type: ButtonType
}

const commonClass = ' kt-text-white kt-rounded-md kt-font-semibold kt-text-base kt-px-4 kt-py-2 kt-w-full '

export const Button = (props: Props) => {
    const {
        dataTestId,
        disabled,
        loading,
        onClick,
        title,
        type,
    } = props

    const bgColor = useMemo(() => {
        switch (type) {
            case 'primary':
                return 'kt-bg-blue-500'
            case 'discourage':
                return 'kt-bg-gray-300'
        }
    }, [type])

    const preventClick = loading === true || disabled === true

    return (
        <button
            className={commonClass + bgColor}
            data-testid={dataTestId}
            disabled={disabled}
            onClick={preventClick ? () => { } : onClick}
            type="button">
            {
                loading === true && <Spinner />
            }
            {title}
        </button>
    )
}