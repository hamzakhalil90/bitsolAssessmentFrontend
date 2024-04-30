import React from 'react';
import {
    BankOutlined,
    BarsOutlined,
    FormOutlined,
    InboxOutlined,
    PhoneOutlined,
    // PhoneOutlined,
    SearchOutlined,
    StarOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';
import { MENU_PATH } from './constants';
import { getLink } from './utils/general';

const MAIN_ICON_SIZE = '!text-[18px]';

export const ROUTES = [
    //FIND PROGRAMMES
    {
        pathname: MENU_PATH.HOME.pathname,
        label: getLink({
            path: MENU_PATH.HOME.pathname,
            label: MENU_PATH.HOME.label,
        }),
        key: MENU_PATH.HOME.key,
        icon: <SearchOutlined className={MAIN_ICON_SIZE} />,
        public: true,
    },
];
