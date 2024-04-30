import { UseQueryOptions } from '@tanstack/react-query';
import { MenuProps } from 'antd';
import { AxiosResponse } from 'axios';


export type MenuItem = Required<MenuProps>['items'][number];

export type AllowedMethodsType = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type HelperFunctions<T> = UseQueryOptions<
    AxiosResponse<T, unknown>,
    AxiosResponse<Error, unknown>,
    AxiosResponse<T, unknown>,
    string[]
>;

export type LabelValueOptions = {
    key?: string;
    label: string;
    value: string;
    title?: string;
};

export type APIResponse<T> = {
    results: T;
    count?: number;
    next?: string | null;
    previous?: string | null;
};