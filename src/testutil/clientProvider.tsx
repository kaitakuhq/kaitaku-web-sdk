import { QueryClient, QueryClientProvider } from "react-query"


// Create a client
const queryClient = new QueryClient()

export const WrappedQueryClient = ({ children }: { children: any }) => {
    return (
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider>
    )
}