import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGetBlogById from '@/hooks/blog/useGetBlogById';
import convertDate from '@/utils/convertDate';
import showToast from '@/utils/toastify';
import { useAuthContext } from '@/context/authContext';
import useGetProfile from '@/hooks/user/useGetProfile';

const BlogPages: React.FC = () => {
    const { blogId } = useParams<{ blogId: string }>();

    const { authUser } = useAuthContext();
    const { getProfileErrMessage, getProfile, profile, getProfileLoading } = useGetProfile();
    const { GetBlogByIdErrMessage, GetBlogByIdLoading, blog, getBlogById } = useGetBlogById();

    useEffect(() => {
        if (blogId) {
            getBlogById(blogId);
        }
    }, [blogId]);

    useEffect(() => {
        if (authUser?.userId) {
            getProfile(authUser.userId);
        }
    }, [authUser]);

    useEffect(() => {
        if (GetBlogByIdErrMessage) {
            showToast(GetBlogByIdErrMessage, 'error');
        }
    }, [GetBlogByIdErrMessage]);

    useEffect(() => {
        if (getProfileErrMessage) {
            showToast(getProfileErrMessage, 'error');
        }
    }, [getProfileErrMessage]);

    if (GetBlogByIdLoading || getProfileLoading || !blog || !profile) {
        return <div>Loading...</div>;
    }

    const trimTag = (tag: string): string => {
        return tag.replace(/^"(.*)"$/, '$1');
    };

    return (
        <div className="flex justify-center">
            <div className="md:min-w-[680px] md:max-w-[680px] min-w-[450px] max-w-[450px]">
                <img
                    src={blog.imageUrl}
                    className="md:rounded-2xl mt-5 mb-5 w-full h-[376px]"
                />
                <h3 className="text-red-500 text-[12px]">{trimTag(blog.tag)}</h3>
                <h3 className="text-[23px] font-bold">{blog.title}</h3>
                <div className="flex items-center mt-5">
                    <img
                        src={profile.data?.ImageUrl || 'default-profile-image-url'}
                        className="w-[35px] rounded-full"
                    />
                    <div className="ml-2">
                        <h3 className="font-bold text-[12px]">{profile.data?.name || 'Unknown'}</h3>
                        <h3 className="text-gray-500 text-[10px]">
                            {convertDate(blog.createdAt)}
                        </h3>
                    </div>
                </div>
                <div className='mt-6'>
                    <h3>{blog.content}</h3>
                </div>
            </div>
        </div>
    );
};

export default BlogPages;
