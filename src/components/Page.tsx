import { SCROLL_BAR_STYLE } from '@/constants';
import React from 'react';

type Props = {
    readonly children: React.ReactNode;
};

function Page({ children }: Props) {
    return <div className={`overflow-y-auto ${SCROLL_BAR_STYLE}`}>{children}</div>;
}

export default Page;
