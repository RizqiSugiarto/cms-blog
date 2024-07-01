import MyBlogComponent from '@/components/blog/myBlog';
import Skeleton from '@/components/common/skeleton';
import React from 'react';

const BlogPage: React.FC = () => {
    return (
        <div className="w-screen h-screen">
            <Skeleton>
                <MyBlogComponent />
            </Skeleton>
        </div>
    );
};

export default BlogPage;
