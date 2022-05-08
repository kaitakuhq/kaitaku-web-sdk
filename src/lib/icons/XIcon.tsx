import react from 'react'
import { IconProps } from '../types'

export const XIcon = (props: IconProps) => {
    const {
        height,
        stroke,
        width,
    } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            height={height}
            stroke={stroke}
            width={width}
            viewBox="0 0 24 24" fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    )
}