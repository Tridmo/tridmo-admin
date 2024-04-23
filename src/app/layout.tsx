import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import React, { Suspense } from 'react';
import AlertWrapper from '../components/alert';
import { Box } from '@mui/system';
import BasicModal from '../components/modals/modal';
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
          <BasicModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}
