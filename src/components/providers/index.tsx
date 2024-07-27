"use client"

import { Provider } from 'react-redux'
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from '@/components/providers/auth'
import store from "@/store";
import ThemeProviderWrapper from '@/theme/ThemeProvider';
import React from 'react';
import dynamic from 'next/dynamic';

const WeavyProvider = dynamic(() => import('./weavy'), { ssr: false });

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <Provider store={store}>
      <CookiesProvider>
        <AuthProvider>
          <ThemeProviderWrapper>
            <WeavyProvider>
              {children}
            </WeavyProvider>
          </ThemeProviderWrapper>
        </AuthProvider>
      </CookiesProvider>
    </Provider>

  );
}