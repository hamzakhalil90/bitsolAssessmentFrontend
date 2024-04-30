/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        // "./node_modules/preline/dist/*.js",
        // "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        screens: {
            '2xl&down': { max: '1535px' }, // '1535px'
            'xl&down': { max: '1279px' }, // '1279px'
            'lg&down': { max: '1023px' }, // '1023px'
            'md&down': { max: '767px' }, // '767px'
            'sm&down': { max: '639px' }, // '639px'
            '2xl&up': { min: '1536px' }, // '1536px'
            'xl&up': { min: '1280px' }, // '1280px'
            'lg&up': { min: '1024px' }, // '1024px'
            'md&up': { min: '768px' }, // '768px'
            'sm&up': { min: '640px' }, // '640px'

            ...defaultTheme.screens,
        },
        extend: {
            colors: {
                darkgreen: {
                    1: '#2a4c5d',
                    2: '#1c3642',
                    3: '#162c35',
                    4: '#102128',
                },
            },
            height: {
                headerHeight: '8dvh',
            },
            margin: {
                headerMargin: '8dvh',
            },
            fontFamily: {
                inter: ['var(--font-inter)'],
                roboto: ['var(--font-roboto)'],
                lato: ['var(--font-lato)'],
                'noto-serif': ['var(--font-noto-serif)'],
                'noto-sans': ['var(--font-noto-sans)'],
                'open-sans': ['var(--font-open-sans)'],
                'source-sans-3': ['var(--font-source-sans-3)'],
                ubuntu: ['var(--font-ubuntu)'],
                raleway: ['var(--font-raleway)'],
            },
            fontWeight: {
                lightBold: 500,
            },
            maxHeight: {
                'page-content': 'calc(100dvh - 100px)',
                'menu-content': 'calc(100dvh - 310px)',
            },
        },
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [
        require('tailwind-scrollbar'),
        // // require('@tailwindcss/forms'),
        require('tailwindcss-animate'),
        // require("@tailwindcss/line-clamp"),
        // require("preline/plugin"),
        // require("flowbite/plugin"),
    ],
};
