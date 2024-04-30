'use client';

import React from 'react';
// import { useIsMutating, useIsFetching } from '@tanstack/react-query';
import { Spin } from 'antd';

type Props = {
    readonly loading?: boolean;
};

function GlobalLoader({ loading }: Props) {
    // const isFetching = useIsFetching();
    // const isMutating = useIsMutating();

    return (
        <div>
            {!!loading && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-100 opacity-50">
                    <Spin size="large" className="z-9999" />
                </div>
            )}
        </div>
    );
}

export default GlobalLoader;
