"use client"

import { Provider } from 'react-redux'
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from '@/components/providers/auth'
import store from "@/store";
import ThemeProviderWrapper from '@/theme/ThemeProvider';
import React, { Suspense } from 'react';
import { NavigationEvents } from './navigation_events';

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
            <Suspense>
              <NavigationEvents />
            </Suspense>
            {children}

          </ThemeProviderWrapper>
        </AuthProvider>
      </CookiesProvider>
    </Provider>

  );
}