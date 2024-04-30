import React from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

import '@/styles/globals.css';
import '@/styles/antdOverrides.css';
import 'react-toastify/dist/ReactToastify.css';

import { lato, inter, noto_sans, noto_serif, open_sans, raleway, roboto, source_sans_3, ubuntu } from '@/fonts/fonts';
import { siteConfig } from '../../config/site.config';

const LayoutProvider = dynamic(() => import('@/providers'), { ssr: false });

export const metadata: Metadata = {
    title: {
        absolute: siteConfig.title,
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
    return (
        <html
            lang="en"
            suppressHydrationWarning={true}
            className={`${lato.variable} ${inter.variable} ${noto_sans.variable} ${noto_serif.variable} ${open_sans.variable}
                ${raleway.variable} ${roboto.variable} ${source_sans_3.variable} ${ubuntu.variable}`}
        >
            <body
                style={{
                    overflow: 'hidden',
                    height: '100dvh',
                    width: '100dvw',
                    margin: 0,
                }}
            >
                <LayoutProvider>{children}</LayoutProvider>
            </body>
        </html>
    );
}
