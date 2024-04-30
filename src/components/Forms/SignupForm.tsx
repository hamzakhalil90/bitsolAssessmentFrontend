'use client';

import React from 'react';
import { NON_MENU_PATHS } from '@/constants';
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useForm } from 'antd/es/form/Form';
import { registerUser } from '@/services/hooks/user';
import { useRouter } from 'next/navigation';
import PasswordStrengthBar from 'react-password-strength-bar';

const SignupForm = () => {
    const [form] = useForm();
    const router = useRouter();

    const password = Form.useWatch('password', form);

    const onSubmit = async (values: any) => {
        const valuesToSubmit = {
            ...values,
        };

        const dob = values.DateOfBirth.format('YYYY-MM-DD');
        valuesToSubmit.DateOfBirth = dob;
        await registerUser(valuesToSubmit).then((res) => {
            if (res?.status === 200) {
                router.push(NON_MENU_PATHS.LOGIN);
            }
        });
    };

    return (
        <div className="mx-4 w-[80%] rounded-md bg-white p-4 shadow-lg sm:mx-auto sm:w-[450px]  sm:p-8">
            <Form layout="vertical" form={form} onFinish={onSubmit}>
                <div className="mb-6 text-center sm:text-left">
                    <h1 className="m-0 py-2">Sign Up</h1>
                    <p className="m-0 text-gray-400">Welcome, please enter your details</p>
                </div>

                <div className="my-5 sm:my-0 sm:flex sm:justify-between sm:gap-5">
                    <div className="mb-5 flex flex-1 flex-col gap-1 sm:w-1/2">
                        <span>First Name </span>
                        <Form.Item
                            className="w-full bg-white"
                            required
                            name="FirstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter first name',
                                },
                            ]}
                        >
                            <Input placeholder="Enter First Name" />
                        </Form.Item>
                    </div>

                    <div className="flex flex-1 flex-col gap-1 sm:w-1/2">
                        <span>Last Name</span>
                        <Form.Item
                            required
                            className="w-full"
                            name="LastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter last name',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Last Name" />
                        </Form.Item>
                    </div>
                </div>

                <div className="my-5 sm:my-0 sm:flex sm:justify-between sm:gap-5">
                    <div className="mb-5 flex flex-1 flex-col gap-1 md:w-1/2">
                        <span>Date of Birth</span>
                        <Form.Item
                            required
                            className="w-full"
                            name="DateOfBirth"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select date of birth',
                                },
                            ]}
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>
                    </div>

                    {/* <div className="flex flex-1 flex-col gap-1 md:w-1/2">
                        <span>Country</span>
                        <Form.Item
                            required
                            name="CountryID"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a country',
                                },
                            ]}
                        >
                            <Select showSearch placeholder="Select a country" optionFilterProp="children" />
                        </Form.Item>
                    </div> */}
                </div>

                <div className=" mb-5 flex flex-1 flex-col gap-1 md:w-full ">
                    <span>Phone Number </span>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please enter phone number',
                            },
                        ]}
                        className="w-full bg-white"
                        required
                        name="PhoneNumber"
                        initialValue={''}
                    >
                        <Input placeholder="Enter Phone Number " />
                    </Form.Item>
                </div>

                <div className="flex w-full flex-col gap-5">
                    <div className=" flex flex-1 flex-col gap-1 md:w-full">
                        <span>Email</span>
                        <Form.Item
                            className="w-full"
                            required
                            name="Email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not a valid email',
                                },
                                {
                                    required: true,
                                    message: 'Please enter email',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Email" type="email" />
                        </Form.Item>
                    </div>

                    <div className=" flex flex-1 flex-col gap-1 md:w-full">
                        <span>Password</span>
                        <Form.Item
                            required
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter password',
                                },
                            ]}
                            initialValue={''}
                        >
                            <Input.Password type="password" />
                        </Form.Item>
                        <PasswordStrengthBar password={password} minLength={6} />
                    </div>
                </div>

                <Form.Item
                    className=""
                    required
                    name="Checkbox"
                    rules={[
                        {
                            required: true,
                            message: 'Please accept terms and conditions',
                        },
                    ]}
                    valuePropName="checked"
                >
                    {/* <p className="flex items-center">
                        <input type="checkbox" className="cursor-pointer items-center" />
                        <label className="ml-2 items-center"> I Accept the Terms of Service and Privacy Policy</label>
                    </p> */}
                    <Checkbox>I Accept the Terms of Service and Privacy Policy</Checkbox>
                </Form.Item>

                <div className="mt-5 flex items-center justify-center p-4">
                    <Button
                        htmlType="submit"
                        type="primary"
                        className="h-[50px] w-2/3 rounded-lg text-center align-middle shadow-md hover:shadow-lg"
                        icon={<LoginOutlined />}
                    >
                        Signup
                    </Button>
                </div>

                <div className="mt-3 text-center">
                    <span className="text-xs">Already have an account?</span>
                    <Link href={NON_MENU_PATHS.LOGIN}>
                        <span className="cursor-pointer font-medium"> Login</span>
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default SignupForm;
