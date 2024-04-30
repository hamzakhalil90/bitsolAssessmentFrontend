import BackendHandler from './backend.handler';
import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN_ALIAS, API, BACKEND_URL, REFRESH_TOKEN_ALIAS } from '@/constants';
import { delCookies, setCookies } from '@/utils/cookies';
import { AuthTokens } from '@/types/auth.types';
import path from 'path';
import { promises as fs } from 'fs';
import type { AllowedMethodsType } from '@/types/custom.types';

const customCaller = async (
    method: AllowedMethodsType,
    tokens: AuthTokens,
    finalURL: string,
    requestBody: object,
    base_url: string,
    isMultiPart?: boolean
) => {
    switch (method) {
        case 'post':
            return await BackendHandler({ tokens, base_url, isMultiPart }).post(finalURL, requestBody);
        case 'patch':
            return await BackendHandler({ tokens, base_url, isMultiPart }).patch(finalURL, requestBody);
        case 'put':
            return await BackendHandler({ tokens, base_url, isMultiPart }).put(finalURL, requestBody);
        case 'delete':
            return await BackendHandler({ tokens, base_url, isMultiPart }).delete(finalURL, requestBody);
        case 'get':
            return await BackendHandler({ tokens, base_url, isMultiPart }).get(finalURL, requestBody);

        default:
            return await BackendHandler({ tokens, base_url, isMultiPart }).get(finalURL, requestBody);
    }
};

export const Handler = async (req: NextRequest) => {
    const isMultiPart = req.headers.get('content-type')?.includes('multipart/form-data') ?? false;

    let finalURL: string;
    let method: AllowedMethodsType;
    let requestBody;

    //* CUSTOM LOGIC FOR MULTIPART FORM DATA
    if (isMultiPart) {
        const data = await req.formData();
        console.log(data); // eslint-disable-line
        finalURL = data.get('url') as string;
        method = data.get('method') as AllowedMethodsType;

        const formData = new FormData();
        for (const [key, value] of data.entries()) {
            if (key.includes('body')) {
                const keyName = key.slice(5, -1);
                formData.append(keyName, value);
            }
        }
        requestBody = formData;
    } else {
        //* CUSTOM LOGIC FOR JSON DATA
        const nextReqBody = await req.json();
        finalURL = nextReqBody.url;
        requestBody = nextReqBody.body || {};
        method = nextReqBody.method || 'get';
    }

    if (process.env.NEXT_PUBLIC_TEST_ENV === 'true') {
        if (method === 'get') {
            const jsonData = JSON.parse(
                await fs.readFile(path.join(process.cwd(), 'src', 'jsons', 'test.data.json'), 'utf-8')
            )[finalURL];
            if (!jsonData) return NextResponse.json({ detail: 'No Test Data Found!' }, { status: 200 });
            const res = NextResponse.json(jsonData['data']);
            return res;
        }
        return NextResponse.json({ detail: 'Not implemented' }, { status: 200 });
    }

    const base_url = BACKEND_URL;

    const tokens = {
        AccessToken: req.cookies.get(ACCESS_TOKEN_ALIAS ?? 'access')?.value ?? '',
        RefreshToken: req.cookies.get(REFRESH_TOKEN_ALIAS ?? 'refresh')?.value ?? '',
        sessionid: req.cookies.get('sessionid')?.value ?? '',
        csrftoken: req.cookies.get('csrftoken')?.value ?? '',
    };

    // if (!tokens.RefreshToken) {
    //     return NextResponse.json({ detail: 'No refresh token' }, { status: 401 });
    // }

    const apiRes = await customCaller(method, tokens, finalURL, requestBody, base_url, isMultiPart);

    if (!apiRes) {
        // Return 503 if backend server is unavailable
        return NextResponse.json({ detail: 'Backend server is unavailable!' }, { status: 503 });
    }

    console.log('api', method, finalURL, apiRes.status); // eslint-disable-line
    // If status is less than 400, return the response
    if (apiRes.status < 400) {
        if (apiRes.status === 204) return NextResponse.json(apiRes.data, { status: 200 });

        const res = NextResponse.json(apiRes.data, { status: apiRes.status });

        return res;
    }

    let apiRes_attempt2;
    // If 401, try to refresh tokens and retry the request
    if (apiRes.status === 401) {
        const refreshTokenResponse = await BackendHandler({ tokens, base_url }).post(`${API.REFRESH_URL}`, {
            refresh: tokens.RefreshToken,
        });

        console.log('Refresh Tokens', refreshTokenResponse.status); // eslint-disable-line

        if (!refreshTokenResponse) {
            return NextResponse.json({ detail: 'Auth Backend server is unavailable!' }, { status: 503 });
        }

        if (refreshTokenResponse.status < 400) {
            // If refresh is successful, set the new tokens and retry the request
            const tokens_new = {
                AccessToken: refreshTokenResponse.data.access,
                RefreshToken: refreshTokenResponse.data.refresh,
                sessionid: req.cookies.get('sessionid')?.value ?? '',
                csrftoken: req.cookies.get('csrftoken')?.value ?? '',
            } as AuthTokens;

            const cookies = refreshTokenResponse?.headers['set-cookie'] as string[];

            apiRes_attempt2 = await customCaller(method, tokens_new, finalURL, requestBody, base_url, isMultiPart);

            console.log(method, finalURL, apiRes_attempt2.status); // eslint-disable-line

            const res = NextResponse.json(apiRes_attempt2.data, { status: apiRes_attempt2.status });

            return setCookies({ res, tokens: tokens_new, cookies: cookies });
        }
        // If refresh is unsuccessful, logout the user
        const res = NextResponse.json(apiRes.data, { status: apiRes.status });
        return delCookies(res);
    }
    // If status is 402 or above, return the response
    return NextResponse.json(apiRes.data, { status: apiRes.status });
};

export default Handler;
