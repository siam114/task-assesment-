import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import "@/styles/loader.css"
import Navbar from '@/components/layout/Navbar';

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
        <>
            <AuthProvider>
                <Navbar />
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
        </>
    );
}
