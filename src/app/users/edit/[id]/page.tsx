'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddUser: React.FC = () => {
    const router = useRouter();

    const roles = [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
    ];

    const handleAddUser = async (values: any) => {
        console.log(values);
        // Combining addressLine1 and addressLine2 into a single address array
        const addresses = [1, 1];
        // Removing addressLine1 and addressLine2 from the values object
        delete values.addressLine1;
        delete values.addressLine2;
        // Adding the new address array to the values object
        values.addresses = addresses;
        values.city = 1;
        values.country = 1;
        values.state = 1;
        try {
            const response = await axios.post('http://127.0.0.1:8000/user/', values);
            console.log(response.data);
            router.push('/users'); // Redirect after successful submission
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold">Add User</h2>
            <p className="text-gray-600">Please fill in the user details below.</p>
            <Form
                layout="vertical"
                onFinish={handleAddUser}
                initialValues={{
                    role: roles[0].value,
                }}
            >
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="UserName" name="username" rules={[{ required: true, message: 'Name is required' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Email is required' },
                        { type: 'email', message: 'Invalid email address' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="password"
                    name="password"
                    rules={[{ required: true, message: 'password is required' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="User Role" name="role" rules={[{ required: true, message: 'Role is required' }]}>
                    <Select>
                        {roles.map((role) => (
                            <Option key={role.value} value={role.value}>
                                {role.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phoneNo"
                    rules={[
                        { required: true, message: 'Phone number is required' },
                        { pattern: /^\d+$/, message: 'Phone number must contain only digits' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address Line 1"
                    name="addressLine1"
                    rules={[{ required: true, message: 'Address Line 1 is required' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address Line 2"
                    name="addressLine2"
                    rules={[{ required: true, message: 'Address Line 2 is required' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="City" name="city" rules={[{ required: true, message: 'City is required' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="State" name="state" rules={[{ required: true, message: 'State is required' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Country is required' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add User
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddUser;
