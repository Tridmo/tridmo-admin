import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/views/navbar";
import Footer from "@/components/views/footer";
import Providers from "@/components/providers";
import React, { Suspense } from 'react';
import { NavigationEvents } from '../components/providers/navigation_events';
import { ToastContainer } from 'react-toastify';
import TopLoading from '../components/top_loading';
import AlertWrapper from '../components/alert';
import { Box } from '@mui/system';

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Demod"
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Box sx={{ position: 'realtive' }}>
            {/* <TopLoading /> */}
            <AlertWrapper />
          </Box>

          <Navbar />

          <section className='body_wrapper_section'>

            {children}

          </section>
        </Providers>
      </body>
    </html>
  );
}
