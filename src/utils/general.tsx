'use client';

import React from 'react';
import { MenuItem, NotificationLog, NotificationLogType } from '@/types/custom.types';
import { FormInstance, Modal } from 'antd';
import Link from 'next/link';
import { FORM_SUBMIT_BUTTON_ID } from '@/constants';
import { RcFile } from 'antd/es/upload';

export const getMenuItem = ({
    label,
    key,
    icon,
    children,
}: {
    label: React.ReactNode;
    key: React.Key;
    icon?: React.ReactNode;
    children?: MenuItem[];
}): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
};

export const getLink = ({ path, label }: { path?: string; label: string }): React.ReactNode => {
    return <Link href={path ?? ''}>{label}</Link>;
};

export const confirmBack = ({
    setToggle,
    form,
}: {
    toggle?: number;
    setToggle: () => void;
    form: FormInstance;
    handleSubmit?: (values: any) => Promise<void>;
}) => {
    if (form.isFieldsTouched()) {
        Modal.confirm({
            title: 'Do you want to save changes?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
                form.submit();
            },
            onCancel: () => {
                setToggle();
                form.resetFields();
            },
        });
    } else {
        setToggle();
        form.resetFields();
    }
};

export const getSelectItems = <T,>(
    data: T[] | T | Record<string | number, string | number>,
    options?: { label: keyof T; value: keyof T; key: keyof T; title?: keyof T }
):
    | {
          key: string;
          label: React.ReactNode;
          value: string;
          title?: string;
      }[]
    | [] => {
    if (Array.isArray(data) && options) {
        return data.map((item) => ({
            key: item[options.key]?.toString() as string,
            label: item[options.label] as React.ReactNode | string,
            value: item[options.value]?.toString() as string,
            title: item[options.title ?? options.label] as string,
        }));
    }

    if (typeof data === 'object') {
        return Object.entries(data as object).map(([key, value]) => ({
            key: key.toString(),
            label: value as React.ReactNode | string,
            value: key.toString(),
            title: value.toString(),
        }));
    }

    if (options)
        return [
            {
                key: data[options.key]?.toString() as string,
                label: data[options.label] as React.ReactNode | string,
                value: data[options.value]?.toString() as string,
                title: data[options.title ?? options.label] as string,
            },
        ];

    return [];
};

export const FormatMoney = (
    amount: number | undefined | null,
    currencyISOCode: string | undefined | null,
    decimals: number = 0
) => {
    if (!currencyISOCode) return 'N/A';

    if (!amount) return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyISOCode }).format(0);

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyISOCode,
        minimumFractionDigits: decimals,
    }).format(amount);
};

export const convertToDollars = (amount: number | undefined | null, currencyISOCode: string | undefined | null) => {
    if (!currencyISOCode) return 0;

    if (!amount) return 0;

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
};

export const convertToPounds = (amount: number | undefined | null, currencyISOCode: string | undefined | null) => {
    if (!currencyISOCode) return 0;

    if (!amount) return 0;

    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2,
    }).format(amount);
};

export const FormatDateTimeToUTC = (
    date: string | undefined | null,
    showTime: boolean = true,
    showTimeOnly: boolean = false
) => {
    if (!date) return 'N/A';

    const dateTime = new Date(date);
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
    };

    if (showTimeOnly) {
        return dateTime.toLocaleTimeString('en-US', timeOptions);
    }

    return `${dateTime.toLocaleDateString('en-US', dateOptions)} ${
        showTime ? dateTime.toLocaleTimeString('en-US', timeOptions) : ''
    }`;
};

export const pressApplicationFormSaveButton = () => {
    const submitButton = document.getElementById(FORM_SUBMIT_BUTTON_ID);
    if (submitButton) {
        submitButton.click();
    }
};

export const getBase64 = (file: RcFile | Blob) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export const isObjectEmptyOrUndefined = (object: object | undefined) => {
    return !object || Object.keys(object).length === 0;
};

export const getEventLogsFromLocalStorage = () => {
    const eventLogs = localStorage.getItem('eventLogs');
    if (eventLogs) {
        return (JSON.parse(eventLogs) as NotificationLog[]).reverse();
    }
    return [];
};

export const appendEventLog = (message: string, type: NotificationLogType, eventLogs: NotificationLog[]) => {
    eventLogs.push({
        NotificationLogID: eventLogs.length + 1,
        NotificationLogText: message,
        NotificationLogType: type,
        NotificationLogTimestamp: new Date().toISOString(),
    });
    localStorage.setItem('eventLogs', JSON.stringify(eventLogs));
};
