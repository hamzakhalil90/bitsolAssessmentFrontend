'use client';
import { Row, Col } from 'antd';
import React from 'react';
import adminPoseImage from '../../../public/assets/images/admin-pose.png';
import authHero from '../../../public/assets/svgs/auth-hero.svg';

type Props = {
    children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
    return (
        <div className="h-screen bg-slate-100">
            <Row className="h-screen">
                <Col xxl={12} lg={12} xs={24} className="max-h-[calc(100dvh-0px)] overflow-y-auto bg-slate-300/60">
                    <div className="flex  flex-col items-center justify-center gap-y-10">{children}</div>
                </Col>
            </Row>
        </div>
    );
};

export default AuthLayout;
