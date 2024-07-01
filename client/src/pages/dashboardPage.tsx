import React from 'react';
import Skeleton from '@/components/common/skeleton';
import DashboardComponent from '@/components/dashboard/dashboard';

const DashboardPage: React.FC = () => {
    return (
        <div className="w-screen h-screen">
            <Skeleton>
                <DashboardComponent />
            </Skeleton>
        </div>
    );
};

export default DashboardPage;
