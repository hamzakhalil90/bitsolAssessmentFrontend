import { NextResponse, NextRequest } from 'next/server';

import { API, BACKEND_URL } from '@/constants';
import BackendHandler from '@/services/handlers/backend.handler';
import { setCookies } from '@/utils/cookies';
import path from 'path';
import { promises as fs } from 'fs';

import { AuthTokens, JwtDecodedObject } from '@/types/auth.types';
import jwtDecode from 'jwt-decode';

export const POST = async (req: NextRequest) => {
    if (process.env.NEXT_PUBLIC_TEST_ENV === 'true') {
        const tokens = { AccessToken: 'test_access_token', RefreshToken: 'test_refresh_token' };
        const jsonData = JSON.parse(
            await fs.readFile(path.join(process.cwd(), 'src', 'jsons', 'test.data.json'), 'utf-8')
        )['api/auth/login/'];

        const getUserRolesApiRes = NextResponse.json({ Result: { ...jsonData['user'] } });
        return setCookies({ res: getUserRolesApiRes, tokens: tokens, cookies: [] });
    }

    const req_body = (await req.json()) ?? {};

    const loginApiRes = await BackendHandler({
        base_url: BACKEND_URL,
    }).post(`${API.LOGIN_URL}`, JSON.stringify(req_body));

    if (!loginApiRes) {
        return NextResponse.json({ detail: 'Backend server is unavailable!' }, { status: 503 });
    }

    if (loginApiRes.status === 200) {
        const cookies = loginApiRes?.headers['set-cookie'] as string[];
        const tokens = loginApiRes.data.Result as AuthTokens;

        const decodedJWT = jwtDecode<JwtDecodedObject>(tokens.AccessToken);

        loginApiRes.data.Result = {
            ...loginApiRes.data.Result,
            UserID: decodedJWT.user_id,
        };
        const response = NextResponse.json(loginApiRes.data);
        return setCookies({ res: response, tokens, cookies });
    }
    return NextResponse.json({ detail: 'Not authorized!' }, { status: loginApiRes.status });
};
