interface Props {
    title: string
}

export const Success = (props: Props) => {
    return (
        <p className="kt-text-sm kt-text-green-600 dark:kt-text-green-500"
            data-testid="success-message"
        >
            {
                props.title
            }
        </p>
    )
}