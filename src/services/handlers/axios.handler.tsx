import axios from 'axios';
import { LOCAL_API, API, FRONTEND_URL, BACKEND_URL } from '@/constants';
import { ErrorHandler } from './error.handler';
import { AuthTokens } from '@/types/auth.types';

const CustomAxios = ({
    tokens,
    type,
    base_url,
    isMultiPart,
}: {
    tokens?: AuthTokens;
    type?: string;
    base_url?: string;
    isMultiPart?: boolean;
}) => {
    const baseURL = type === 'next' ? FRONTEND_URL : base_url;

    const headers = {
        Accept: 'application/json',
        'Content-type': 'application/json',
    };

    if (isMultiPart) {
        headers['Content-type'] = 'multipart/form-data';
        headers['Accept'] = '*/*';
    }

    const axiosInstance = axios.create({
        baseURL,
        headers,
        maxContentLength: 128000000,
        maxBodyLength: 1280000000,
    });
    if (tokens?.AccessToken) {
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + tokens?.AccessToken;
        axiosInstance.defaults.headers.common['Cookie'] =
            `csrftoken=${tokens?.csrftoken}; sessionid=${tokens?.sessionid}`;
    }

    axiosInstance.interceptors.response.use(
        (res) => {
            if (type !== 'next') return res;
            else return ErrorHandler(res);
        },
        async (err) => {
            const { response, config } = err;
            if (
                type !== 'next' ||
                [
                    `${BACKEND_URL}/${LOCAL_API.LOGIN_URL}`,
                    API.LOGIN_URL,
                    API.GET_USER_ROLES_URL,
                    `${BACKEND_URL}/${LOCAL_API.LOGOUT_URL}`,
                    API.LOGOUT_URL,
                ].includes(config.url)
            ) {
                return response;
            } else {
                return ErrorHandler(response);
            }
        }
    );

    return axiosInstance;
};

export default CustomAxios;
