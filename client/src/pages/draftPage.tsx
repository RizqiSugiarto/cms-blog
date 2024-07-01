import DraftComponent from '@/components/draft/draft';
import Skeleton from '@/components/common/skeleton';
import React from 'react';

const DraftPage: React.FC = () => {
    return (
        <div className="w-screen h-screen">
            <Skeleton>
                <DraftComponent />
            </Skeleton>
        </div>
    );
};

export default DraftPage;
