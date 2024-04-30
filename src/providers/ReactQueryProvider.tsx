import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
type Props = {
    children: React.ReactNode;
};

function ReactQueryProvider({ children }: Props) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 0,
                staleTime: 1000 * 0, //0seconds
                cacheTime: 1000 * 0, //0 seconds
                refetchOnMount: 'always',
                refetchOnWindowFocus: false,
                refetchOnReconnect: true,
                refetchInterval: 1000 * 0, //0 seconds
                refetchIntervalInBackground: false,
                suspense: false,
            },
            mutations: {
                retry: 0,
            },
        },
    });
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default ReactQueryProvider;
