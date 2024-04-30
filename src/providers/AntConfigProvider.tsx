'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd';
import { lato, inter, noto_sans, noto_serif, open_sans, raleway, roboto, source_sans_3, ubuntu } from '@/fonts/fonts';
import { DEFAULT_PRIMARY_COLOR, DEFAULT_SECONDARY_COLOR } from '@/constants';

const FONTS = {
    lato: lato.style.fontFamily,
    inter: inter.style.fontFamily,
    noto_sans: noto_sans.style.fontFamily,
    noto_serif: noto_serif.style.fontFamily,
    open_sans: open_sans.style.fontFamily,
    raleway: raleway.style.fontFamily,
    roboto: roboto.style.fontFamily,
    source_sans_3: source_sans_3.style.fontFamily,
    ubuntu: ubuntu.style.fontFamily,
};

const NULL_CHECK_ARRAY = [undefined, ''];

type Props = {
    children: React.PropsWithChildren<React.ReactNode>;
};

function AntConfigProvider({ children }: Props) {
    const [fontFamily, setFontFamily] = React.useState<keyof typeof FONTS>('inter');

    /* --------------------------------- HELPERS -------------------------------- */

    /* ---------------------------------- THEME --------------------------------- */

    const config: ThemeConfig = {
        token: {
            fontFamily: FONTS[fontFamily],
            colorBgContainer: '#ffffff',
            colorBgBase: '#ffffff',
            colorBgLayout: '#ffffff',
        },
    };

    return (
        <ConfigProvider theme={config} direction="ltr">
            {children}
        </ConfigProvider>
    );
}

export default AntConfigProvider;
