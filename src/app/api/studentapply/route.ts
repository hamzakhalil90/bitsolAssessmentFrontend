import { Handler } from '@/services/handlers/nextapi.router';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
    return Handler(req);
};
