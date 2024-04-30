import React from 'react';
import { GlobalOutlined, MailFilled, StarFilled } from '@ant-design/icons';
import { Button, Popover, Tag, Tooltip } from 'antd';
import { ApplicationFormView } from '@/types/custom.types';
import { FormatDateTimeToUTC } from '@/utils/general';

interface Props {
    data: ApplicationFormView;
}

function UserProfileCard({ data }: Props) {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-x-4">
                <span
                    className="h-32 w-20"
                    style={{
                        backgroundImage: `url('https://via.placeholder.com/150')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <div className="flex flex-col gap-y-2">
                    <span className="text-xl font-medium capitalize">
                        {data.User.FirstName} {data.User.LastName}
                    </span>

                    <span className="flex flex-row gap-x-4">
                        {data.User && (
                            <Tooltip title="Applicant ID">
                                <Tag>ID: {data.User.UserID}</Tag>
                            </Tooltip>
                        )}

                        {data.User.Country && (
                            <Tooltip title="Country">
                                <span className="flex flex-row items-center gap-x-1 text-gray-500">
                                    <GlobalOutlined />

                                    <span>{data.User.Country}</span>
                                </span>
                            </Tooltip>
                        )}

                        {data.User.DateOfBirth && (
                            <Tooltip title="Date of Birth">
                                <span className="flex flex-row items-center gap-x-1 text-gray-500">
                                    <StarFilled />

                                    <span>{FormatDateTimeToUTC(data.User.DateOfBirth, false)}</span>
                                </span>
                            </Tooltip>
                        )}
                    </span>
                </div>
            </div>
            <Popover
                placement="left"
                trigger={['click']}
                content={<Button icon={<MailFilled />}>Send Email</Button>}
                title={data.User.Email}
            >
                <Button
                    className="flex items-center justify-center"
                    size="large"
                    shape="circle"
                    icon={<MailFilled className="text-gray-500" />}
                />
            </Popover>
        </div>
    );
}

export default UserProfileCard;
