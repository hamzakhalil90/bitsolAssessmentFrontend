import React from 'react';
import { Divider, Menu } from 'antd';
import { usePathname } from 'next/navigation';
import { getMenuItem } from '@/utils/general';
import { MenuItem } from '@/types/custom.types';
import { ROUTES } from '@/routes';
import { userService } from '@/services';

function BaseSider() {
    let routes = ROUTES.slice();

    /* ---------------------------------- HOOKS --------------------------------- */
    const [menuItems, setMenuItems] = React.useState<MenuItem[]>([]);
    const [selectedKey, setSelectedKey] = React.useState<string[]>([]);

    const pathname = usePathname();
    const { user } = userService((state: any) => {
        return {
            user: state.user,
        };
    });

    /* --------------------------------- EFFECTS -------------------------------- */

    React.useEffect(() => {
        setMenuItems(getMenuItems());
        setSelectedKey(getSelectedMenuItemKeys(pathname));
    }, [pathname, user]);

    /* --------------------------------- HELPERS -------------------------------- */

    const getMenuItems = (): MenuItem[] => {
        return routes
            .filter((route) => {
                if (route.public || user.UserID) {
                    return true;
                }
                return false;
            })
            .map((route) => {
                return getMenuItem({ ...route });
            });
    };

    const getSelectedMenuItemKeys = (pathname: string): string[] => {
        const splitPath = pathname.split('/');

        let selectedPath = '/' + splitPath[1];

        if (splitPath[2]) {
            selectedPath += '/' + splitPath[2];
        }

        const route = routes.find((route) => route.pathname === selectedPath);

        if (route) {
            return [route.key];
        }
        return [];
    };

    /* ----------------------------------- UI ----------------------------------- */

    return (
        <div className="h-[100%] overflow-x-hidden bg-blue-400">
            <div className="flex h-full flex-col items-center gap-y-4 ">
                <div className="flex h-full w-full flex-col items-center justify-between overflow-y-auto py-1">
                    <Menu mode="inline" items={menuItems} selectedKeys={selectedKey} />
                    <div>
                        <Divider />
                        <span className="text-center text-xs text-black"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BaseSider;
