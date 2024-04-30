'use client';
import { useEffect, useState } from 'react';
import { Button, Dropdown, MenuProps, Modal } from 'antd';
import axios from 'axios';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ButtonX from '@/components/Common/ButtonX';
import Table, { ColumnType } from 'antd/es/table';
import { IUserObject } from '@/types/auth.types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { NON_MENU_PATHS } from '@/constants';
type Props = {};

const Users = (props: Props) => {
    const [userData, setUserData] = useState<IUserObject[]>([]);
    const router = useRouter();

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/user/');
            if (response.status === 200) {
                setUserData(response.data.msg_code.data);
                console.log(response.data.msg_code.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []); // Fetch data on component mount

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/user?id=${id}`);
            if (response.status === 200) {
                window.location.reload();
                toast.success('user deleted successfully');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getEditMenuItems = () => {
        const menuItems: MenuProps['items'] = [
            {
                label: 'Edit',
                key: 'edit',
                icon: <EditOutlined />,
            },
            {
                label: 'Clone',
                key: 'clone',
                icon: <CopyOutlined />,
            },
            {
                label: 'Delete',
                key: 'delete',
                icon: <DeleteOutlined className="text-red-600" />,
            },
        ];

        return menuItems;
    };

    const onEditMenuItemClick = (key: string, record: IUserObject) => {
        switch (key) {
            case 'edit':
                router.push(`${NON_MENU_PATHS.USER_EDIT}/${record.id}`);
                break;
            case 'delete':
                Modal.confirm({
                    title: 'Do you want to delete the Application Form?',
                    okText: 'Delete',
                    cancelText: 'Cancel',
                    centered: true,
                    okButtonProps: { danger: true },
                    onOk: () => handleDelete(record.id),
                    onCancel: () => {},
                });
                break;
            default:
                break;
        }
    };

    const columns: ColumnType<IUserObject>[] = [
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
            render: (_, record) => <span>{record.username}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
            render: (_, record) => <span>{record.email}</span>,
        },
        {
            title: 'Organization',
            dataIndex: 'Organization',
            key: 'Organization',
            render: (_: string, record) => <span>{record.organization}</span>,
        },
        {
            title: 'Is Staff',
            dataIndex: 'is_staff',
            key: 'is_staff',
            render: (_, record) => <span>{record.is_staff ? 'True' : 'False'}</span>,
        },
        {
            title: '',
            key: 'actions',
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: getEditMenuItems(),
                        onClick: (info) => onEditMenuItemClick(info.key, record),
                    }}
                    trigger={['click']}
                    placement="bottomRight"
                    arrow={{ pointAtCenter: true }}
                >
                    <ButtonX type="primary"></ButtonX>
                </Dropdown>
            ),
        },
    ];

    return (
        <div className="p-32">
            {userData.length > 0 && (
                <div>
                    <Table
                        columns={columns}
                        dataSource={userData}
                        pagination={{ pageSize: 8 }}
                        style={{ fontWeight: 'normal' }}
                    />

                    <ButtonX type="primary" onClick={() => router.push(`${NON_MENU_PATHS.USER_EDIT}/$edit`)}>
                        Add new grade
                    </ButtonX>
                </div>
            )}
        </div>
    );
};

export default Users;
