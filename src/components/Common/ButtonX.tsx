import React from 'react';
import { Button, ButtonProps } from 'antd';

interface ButtonXProps extends ButtonProps {
    children?: React.ReactNode;
    divider?: boolean;
}

function ButtonX({ children, divider, ...props }: ButtonXProps) {
    if (!('type' in props)) {
        props.type = 'primary';
    }
    if (divider) {
        return (
            <div className="flex w-full flex-row items-center justify-center gap-x-4 py-4">
                <span className="h-[0.5px] w-1/2 bg-gray-200 "></span>
                <Button {...props}>{children}</Button>
                <span className="h-[0.5px] w-1/2 bg-gray-200"></span>
            </div>
        );
    }

    return <Button {...props}>{children}</Button>;
}

export default ButtonX;
