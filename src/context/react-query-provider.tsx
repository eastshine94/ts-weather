import * as React from 'react';
import { QueryClient, QueryClientProvider, DefaultOptions } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const defaultOptions: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: 0,
    useErrorBoundary: true,
  },
  mutations: {
    useErrorBoundary: true,
  },
};
const queryClient: QueryClient = new QueryClient({ defaultOptions });

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default { ReactQueryProvider };
