import { FC, ReactElement, Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from '@/apps/moo/stores';
import MooAppMain from '@/apps/moo/app-main';

axios.defaults.baseURL = "http://localhost:8899";

const queryClient = new QueryClient();

const MooApp: FC = (): ReactElement => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MooAppMain />
      </QueryClientProvider>
    </Provider>
  )
}

export default MooApp;