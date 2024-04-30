import { ACCESS_TOKEN_ALIAS, BACKEND_URL, LOCAL_API, REFRESH_TOKEN_ALIAS } from '@/constants';
import { delCookies } from '@/utils/cookies';
import BackendHandler from '@/services/handlers/backend.handler';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const tokens = {
        AccessToken: req.cookies.get(ACCESS_TOKEN_ALIAS ?? 'access')?.value ?? '',
        RefreshToken: req.cookies.get(REFRESH_TOKEN_ALIAS ?? 'refresh')?.value ?? '',
    };
    const apiRes = await BackendHandler({ tokens, base_url: BACKEND_URL }).post(LOCAL_API.LOGOUT_URL);
    const res = NextResponse.json(apiRes.data, { status: apiRes.status });
    console.log('logout', res.status); // eslint-disable-line
    return delCookies(res);
};
