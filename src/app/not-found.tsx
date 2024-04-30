'use client';
import { NON_MENU_PATHS } from '@/constants';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';

function NotFoundPage() {
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">404 Not Found</h1>
            <p className="text-lg">
                The requested resource could not be found, please try reloading the page or if you are not logged in,
                please try logging in and try again.
            </p>
            <Link href={NON_MENU_PATHS.LOGIN}>
                <Button type="primary">Go to login page</Button>
            </Link>
        </div>
    );
}

export default NotFoundPage;
