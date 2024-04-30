'use client';

import { SESSION_OBJECT_NAME, USER_SESSION_DEFAULT_DATA } from '@/constants';
import { UserSessionObject } from '@/types/auth.types';
import ls from 'localstorage-slim';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const getSessionDataFromLocalStorage = () => {
    try {
        const data = ls.get<UserSessionObject>(SESSION_OBJECT_NAME, { decrypt: true }) ?? USER_SESSION_DEFAULT_DATA;
        return data;
    } catch (error) {
        return USER_SESSION_DEFAULT_DATA;
    }
};

export const userService = create(
    subscribeWithSelector<UserSessionObject>(() =>
        typeof window !== 'undefined' ? getSessionDataFromLocalStorage() : USER_SESSION_DEFAULT_DATA
    )
);
