import React, { useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import GlobalLoader from '@/components/GlobalLoader';
import { MENU_PATH, NON_MENU_PATHS } from '@/constants';
import { userService } from '@/services';

const publicPaths = [NON_MENU_PATHS.LOGIN, NON_MENU_PATHS.HOME, NON_MENU_PATHS.SIGNUP, NON_MENU_PATHS.USER_EDIT];

function RouteGuard({ children }: { readonly children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const user = userService.getState().user;

    const [pageLoading, setPageLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    const hideContent = async () => {
        setPageLoading(true);
        setAuthorized(false);
    };

    const authCheck = useCallback(async () => {
        await hideContent();
        const publicPaths = [NON_MENU_PATHS.LOGIN, NON_MENU_PATHS.SIGNUP];
        const path = pathname?.split('?')[0];
        console.log('this is the user data ', user);
        //* if user is logged in and trying to access login page, redirect to home page
        if (user.id && publicPaths.includes(path)) {
            setAuthorized(true);
            setPageLoading(false);
            router.push(MENU_PATH.HOME.pathname);
        }
        //* if user is not logged in and trying to access a private page, redirect to login page
        if (!user.id && !publicPaths.includes(path)) {
            setAuthorized(false);
            setPageLoading(false);
            router.push(NON_MENU_PATHS.LOGIN);
        } else {
            //* if user is logged in and trying to access a private page, allow access
            setAuthorized(true);
            setPageLoading(false);
        }
        setPageLoading(false);
    }, [router, user, pathname]);

    useEffect(() => {
        authCheck();
    }, [authCheck, pathname, searchParams, user]);

    if (pageLoading || !authorized) {
        return <GlobalLoader loading={true} />;
    }

    return <>{children}</>;
}
export default RouteGuard;
