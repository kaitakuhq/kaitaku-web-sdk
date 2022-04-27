export const Error = () => {
    return (
        <p className="kt-text-sm kt-text-red-600 dark:kt-text-red-500"
            data-testid="error-message"
        >
            <span className="kt-font-medium">Oh, snapp!</span>
            Some error message.
        </p>
    )
}