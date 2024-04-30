import { BACKEND_URL, LOCAL_API } from '@/constants';
import BackendHandler from '@/services/handlers/backend.handler';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const req_body = (await req.json()) ?? {};
    const apiRes = await BackendHandler({ base_url: BACKEND_URL }).post(
        LOCAL_API.REGISTER_URL,
        JSON.stringify(req_body)
    );
    const res = NextResponse.json(apiRes.data, { status: apiRes.status });
    return res;
};
