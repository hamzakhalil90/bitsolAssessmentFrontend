'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import NotificationProvider from './NotificationProvider';

const ReactQueryProvider = dynamic(() => import('./ReactQueryProvider'));
const AntConfigProvider = dynamic(() => import('./AntConfigProvider'));
const BaseLayout = dynamic(() => import('../components/Layout/BaseLayout'), {
    ssr: false,
});
const RouteGuard = dynamic(() => import('@/middleware/RouteGuard'), {
    ssr: false,
});

type Props = {
    children: React.ReactNode;
};

function LayoutProvider({ children }: Props) {
    return (
        <ReactQueryProvider>
            <AntConfigProvider>
                <NotificationProvider />
                <BaseLayout>
                    <RouteGuard> {children} </RouteGuard>
                </BaseLayout>
            </AntConfigProvider>
        </ReactQueryProvider>
    );
}

export default LayoutProvider;
