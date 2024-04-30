import {
    Inter,
    Roboto,
    Lato,
    Noto_Serif,
    Noto_Sans,
    Open_Sans,
    Source_Sans_3,
    Ubuntu,
    Raleway,
} from 'next/font/google';

export const inter = Inter({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

export const lato = Lato({
    weight: ['100', '300', '400', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lato',
});

export const noto_serif = Noto_Serif({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-noto-serif',
});

export const noto_sans = Noto_Sans({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-noto-sans',
});

export const open_sans = Open_Sans({
    weight: ['300', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-open-sans',
});

export const source_sans_3 = Source_Sans_3({
    weight: ['300', '400', '500', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-source-sans-3',
});

export const ubuntu = Ubuntu({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-ubuntu',
});

export const raleway = Raleway({
    weight: ['100', '200', '300', '400', '500', '600', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-raleway',
});
