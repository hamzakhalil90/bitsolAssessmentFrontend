import type { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { logout } from '../hooks/user';
import { appendEventLog, getEventLogsFromLocalStorage } from '@/utils/general';
import { redirect } from 'next/navigation';

const SUCCESS_CODES = [200, 201, 202, 203, 204, 205, 206];
const INFO_CODES = [308];
const WARNING_CODES = [307];
const AUTHENTICATION_CODES = [401, 403];

export const ErrorHandler = (errorRes: AxiosResponse<Error, unknown>) => {
    const eventLogs = getEventLogsFromLocalStorage();

    if (AUTHENTICATION_CODES.includes(errorRes.status)) {
        toast.error('Session expired. Please login again.', {
            toastId: 'session-expired',
        });
        logout();
        redirect('/login');
    } else if (errorRes.data.message) {
        if (SUCCESS_CODES.includes(errorRes.status)) {
            toast.success(errorRes.data.message);
            appendEventLog(errorRes.data.message, 'success', eventLogs);
        } else if (INFO_CODES.includes(errorRes.status)) {
            toast.info(errorRes.data.message);
            appendEventLog(errorRes.data.message, 'info', eventLogs);
        } else if (WARNING_CODES.includes(errorRes.status)) {
            toast.warn(errorRes.data.message);
            appendEventLog(errorRes.data.message, 'warning', eventLogs);
        } else if (errorRes.status >= 400) {
            toast.error(errorRes.data.message);
            appendEventLog(errorRes.data.message, 'error', eventLogs);
        } else {
            toast.error(
                'Connection to the server might be lost or server is not able to respond. Please try reloading the page.'
            );
        }
    }

    return errorRes;
};
