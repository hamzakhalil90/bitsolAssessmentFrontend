'use client';
import { ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

export default function ErrorPage({
    reset,
}: {
    readonly error: Error & { readonly digest?: string };
    readonly reset: () => void;
}) {
    return (
        <div className="flex flex-col items-start gap-y-5 p-20">
            <h2>Something went wrong!</h2>
            <span>Please try reloading the page and if the issue persists contact the administrator.</span>

            <Button icon={<ReloadOutlined />} type="primary" onClick={() => reset()}>
                Reload
            </Button>
        </div>
    );
}
