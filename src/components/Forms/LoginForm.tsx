'use client';

import { MENU_PATH, NON_MENU_PATHS } from '@/constants';
import { LoginCredentials } from '@/types/auth.types';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { LoginOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { userService } from '@/services';

const LoginForm = () => {
    /* ---------------------------------- HOOKS --------------------------------- */
    const form = useForm<LoginCredentials>()[0];
    const router = useRouter();

    /* --------------------------------- QUERIES -------------------------------- */

    /* --------------------------------- HELPERS -------------------------------- */

    const onSubmit = async (values: LoginCredentials) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', values);
            if (response.status === 200) {
                userService.setState({ user: response.data.msg_code });
                router.push(MENU_PATH.HOME.pathname);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    /* ----------------------------------- UI ----------------------------------- */

    return (
        <div className="mx-4 w-[80%] rounded-md bg-white p-4 shadow-lg sm:mx-auto sm:w-[450px] sm:p-8">
            <Form form={form} layout="vertical" onFinish={onSubmit}>
                <div className="mb-6 text-center">
                    <h1 className="my-0 py-2 ">Log In</h1>
                    <p className="my-0 text-gray-400">Welcome, please enter your details</p>
                </div>
                <div className="flex w-full flex-col">
                    <div className="flex flex-col gap-5">
                        <div className="my-1 flex flex-col gap-1 ">
                            <span>Email</span>
                            <Form.Item
                                className="w-full"
                                required
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid email',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your email',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter Email" />
                            </Form.Item>
                        </div>
                        <div className="my-2 flex flex-col gap-1">
                            <span>Password</span>
                            <Form.Item
                                className="full"
                                required
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Password" type="password" />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="flex justify-center p-4">
                        <Button
                            htmlType="submit"
                            type="primary"
                            className="mt-5 h-[50px] w-2/3 rounded-lg text-center align-middle shadow-md hover:shadow-lg"
                            icon={<LoginOutlined />}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;
