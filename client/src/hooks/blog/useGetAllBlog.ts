import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBlogsStart, fetchBlogsSuccess, fetchBlogsFailure } from '@/store/blogSlice';

const BaseUrl = import.meta.env.VITE_BASE_URL;

const useGetAllBlogsByUserId = (userId: string): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        dispatch(fetchBlogsStart());
        const response = await fetch(`${BaseUrl}/blogs/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const responseData = await response.json();
        dispatch(fetchBlogsSuccess({ count: responseData.count, data: responseData.data }));
      } catch (error: any) {
        dispatch(fetchBlogsFailure(error.message || 'Failed to fetch blogs'));
      }
    };

    fetchBlogs();
  }, [dispatch, userId]);
};

export default useGetAllBlogsByUserId;
