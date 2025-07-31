import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import "@/styles/loader.css"

export const metadata: Metadata = {
  title: 'Task Management',
  description: 'Manage you tasks.'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      className={`${lato.className}`}
      suppressHydrationWarning={true}
    >
      <body className={'overflow-hidden'}>
        <AuthProvider>
          {children}
          {/* {session ? children : <AuthLayout>{children}</AuthLayout>} */}
        </AuthProvider>
        <ToastContainer
          position='top-right'
          autoClose={2300}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </body>
    </html>
  );
}
