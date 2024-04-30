import jwt_decode from 'jwt-decode';
import type { AuthTokens, JwtDecodedObject } from '@/types/auth.types';
import type { NextResponse } from 'next/server';
import { ACCESS_TOKEN_ALIAS, REFRESH_TOKEN_ALIAS } from '@/constants';

export const setCookies = async ({
    res,
    tokens,
    cookies,
}: {
    res: NextResponse;
    tokens: AuthTokens;
    cookies?: string[];
}) => {
    if (process.env.NEXT_PUBLIC_TEST_ENV === 'true') {
        return res;
    }
    if (cookies) {
        res.cookies.set({
            name: 'csrftoken',
            value: getCsrfCookieValue(cookies),
            maxAge: Number(getCsrfCookieMaxAge(cookies)),
            domain: process.env.NEXT_PUBLIC_FRONTEND_HOST,
            secure: process.env.NEXT_PUBLIC_SSL === 'true',
            expires: new Date(getCsrfCookieExpires(cookies)),
            sameSite: 'strict',
            httpOnly: true,
            path: '/',
        });

        res.cookies.set({
            name: 'sessionid',
            value: getSessionIdCookieValue(cookies),
            maxAge: Number(getSessionIdCookieMaxAge(cookies)),
            domain: process.env.NEXT_PUBLIC_FRONTEND_HOST,
            secure: process.env.NEXT_PUBLIC_SSL === 'true',
            expires: new Date(getSessionIdCookieExpires(cookies)),
            sameSite: 'strict',
            httpOnly: true,
            path: '/',
        });
    }

    res.cookies.set({
        name: ACCESS_TOKEN_ALIAS ?? 'access',
        value: tokens.AccessToken,
        domain: process.env.NEXT_PUBLIC_FRONTEND_HOST,
        secure: process.env.NEXT_PUBLIC_SSL === 'true',
        expires: new Date(jwt_decode<JwtDecodedObject>(`${tokens.AccessToken}`)?.exp * 1000),
        sameSite: 'strict',
        httpOnly: true,
        path: '/',
    });

    res.cookies.set({
        name: REFRESH_TOKEN_ALIAS ?? 'refresh',
        value: tokens.RefreshToken,
        domain: process.env.NEXT_PUBLIC_FRONTEND_HOST,
        secure: process.env.NEXT_PUBLIC_SSL === 'true',
        expires: new Date(jwt_decode<JwtDecodedObject>(`${tokens.RefreshToken}`)?.exp * 1000),
        sameSite: 'strict',
        httpOnly: true,
        path: '/',
    });

    return res;
};

export const delCookies = async (res: NextResponse) => {
    res.cookies.set({
        name: 'csrftoken',
        value: '',
        domain: process.env.NEXT_PUBLIC_FRONTEND_HOST,
        secure: process.env.NEXT_PUBLIC_SSL === 'true',
        expires: new Date(0),
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
    });

    res.cookies.set({
        name: 'sessionid',
        value: '',
        domain: process.env.NEXT_PUBLIC_FRONTEND_HOST,
        secure: process.env.NEXT_PUBLIC_SSL === 'true',
        expires: new Date(0),
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
    });

    res.cookies.set({
        name: ACCESS_TOKEN_ALIAS ?? 'access',
        value: '',
        domain: process.env.NEXT_PUBLIC_FRONTEND_HOST,
        secure: process.env.NEXT_PUBLIC_SSL === 'true',
        expires: new Date(0),
        sameSite: 'strict',
        httpOnly: true,
        path: '/',
    });

    res.cookies.set({
        name: REFRESH_TOKEN_ALIAS ?? 'refresh',
        value: '',
        domain: process.env.NEXT_PUBLIC_FRONTEND_HOST,
        secure: process.env.NEXT_PUBLIC_SSL === 'true',
        expires: new Date(0),
        sameSite: 'strict',
        httpOnly: true,
        path: '/',
    });

    return res;
};

const getCsrfCookieValue = (cookies: string[]) => {
    const csrfCookieString = cookies[0];
    const splitCsrf = csrfCookieString.split(';');
    const csrfValue = splitCsrf[0].split('=')[1];
    return csrfValue;
};

const getSessionIdCookieValue = (cookies: string[]) => {
    const sessionIDCookieString = cookies[1];
    const sessionIDSplit = sessionIDCookieString.split(';');
    const sessionIDValue = sessionIDSplit[0].split('=')[1];
    return sessionIDValue;
};

const getCsrfCookieMaxAge = (cookies: string[]) => {
    const csrfCookieString = cookies[0];
    const splitCsrf = csrfCookieString.split(';');
    const csrfMaxAge = splitCsrf[2].split('=')[1];
    return csrfMaxAge;
};

const getSessionIdCookieMaxAge = (cookies: string[]) => {
    const sessionIDCookieString = cookies[1];
    const sessionIDSplit = sessionIDCookieString.split(';');
    const sessionIDMaxAge = sessionIDSplit[3].split('=')[1];
    return sessionIDMaxAge;
};

const getCsrfCookieExpires = (cookies: string[]) => {
    const csrfCookieString = cookies[0];
    const splitCsrf = csrfCookieString.split(';');
    const csrfExpires = splitCsrf[1].split('=')[1];
    return csrfExpires;
};

const getSessionIdCookieExpires = (cookies: string[]) => {
    const sessionIDCookieString = cookies[1];
    const sessionIDSplit = sessionIDCookieString.split(';');
    const sessionIDExpires = sessionIDSplit[1].split('=')[1];
    return sessionIDExpires;
};
