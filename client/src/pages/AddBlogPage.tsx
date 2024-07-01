import AddBlogComponent from '@/components/blog/addBlog';
import Skeleton from '@/components/common/skeleton';
import React from 'react';

const AddBlogPage: React.FC = () => {
    return (
        <div className="w-screen h-screen">
            <Skeleton>
                <AddBlogComponent />
            </Skeleton>
        </div>
    );
};

export default AddBlogPage;
