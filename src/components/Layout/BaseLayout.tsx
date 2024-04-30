'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Layout, theme } from 'antd';
import { usePathname } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import { NON_MENU_PATHS } from '@/constants';

const GlobalLoader = dynamic(() => import('@/components/GlobalLoader'));
const BaseSider = dynamic(() => import('./Sider/BaseSider'), { ssr: false });

const { Header, Sider, Content } = Layout;

const NO_LAYOUT_PATHS = [NON_MENU_PATHS.LOGIN, NON_MENU_PATHS.SIGNUP];

type Props = {
    children: React.ReactNode;
};

const BaseLayout: React.FC<Props> = ({ children }: Props) => {
    const { token } = theme.useToken();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = React.useState<boolean>(false);

    if (NO_LAYOUT_PATHS.includes(pathname) || pathname.includes(NON_MENU_PATHS.LOGIN)) {
        return (
            <React.Fragment>
                <NextTopLoader showSpinner={false} />
                {children}
                <GlobalLoader />
            </React.Fragment>
        );
    }

    return (
        <Layout className={`!h-[100dvh] !w-[100dvw]`}>
            <NextTopLoader showSpinner={false} />

            <Sider
                className="z-[999] !h-[100%] shadow-lg shadow-black lg&down:!absolute"
                breakpoint="lg"
                collapsedWidth="0"
                zeroWidthTriggerStyle={{
                    top: 12,
                }}
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    backgroundColor: token?.colorPrimary,
                }}
                collapsible
            >
                <BaseSider />
            </Sider>
            <Layout>
                <Content className="relative flex flex-col !overflow-x-hidden !overflow-y-hidden">
                    {children}

                    <GlobalLoader />
                </Content>
                {/* <Footer className="!w-[100%]  !bg-slate-100">
                <BaseFooter />
            </Footer> */}
            </Layout>
        </Layout>
    );
};

export default BaseLayout;
