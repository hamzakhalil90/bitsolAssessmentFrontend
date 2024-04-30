import React from 'react';
import { AssessmentAPI } from '@/services/api';
import { API, LOCAL_API, SESSION_OBJECT_NAME, TEST_ENV, USER_SESSION_DEFAULT_DATA } from '@/constants';
import FrontendHandler from '@/services/handlers/frontend.handler';
import ls from 'localstorage-slim';
import { userService } from '@/services/user.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginCredentials, IUserObject } from '@/types/auth.types';
import { HelperFunctions } from '@/types/custom.types';
import { toast } from 'react-toastify';

export const getUserData = async <T,>(id: number) => {
    return AssessmentAPI<T>({
        url: API.USERS_CRUD_URL + `${id}`,
        method: 'get',
    });
};

export const getUsers = async <T,>() => {
    return AssessmentAPI<T>({
        url: API.USERS_CRUD_URL,
        method: 'get',
    });
};

export const updateUser = async ({ id, values }: { id: number; values: IUserObject }) => {
    return AssessmentAPI({
        url: API.USERS_CRUD_URL + `${id}/`,
        method: 'patch',
        body: values,
    });
};

export const registerUser = async (values: IUserObject) => {
    console.log('object');
    const res = await FrontendHandler().post(LOCAL_API.REGISTER_URL + '/', values);
    if (res?.status === 200) {
        toast.success(
            <div className="text-base">
                <span className="font-bold capitalize">Invalid Credentials!</span>
            </div>
        );
    }

    return res;
};

export async function login(values: LoginCredentials) {
    const res = await FrontendHandler(false).post(LOCAL_API.LOGIN_URL, values);

    return res;
}

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation(login, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['user']);
        },
    });
};

export async function logout() {
    // clear local storage, publish default to user subscribers and redirect to login page
    ls.set(SESSION_OBJECT_NAME, USER_SESSION_DEFAULT_DATA, { encrypt: true });
    userService.setState({
        user: USER_SESSION_DEFAULT_DATA.user,
    });
    await FrontendHandler(false).post(API.LOGOUT_URL);
}

export const useUsers = <T,>(helpers: HelperFunctions<T>) => useQuery(['users'], () => getUsers<T>(), helpers);

export const useEditUser = () => {
    const queryClient = useQueryClient();
    return useMutation(updateUser, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['locations_tracker']);
        },
    });
};
