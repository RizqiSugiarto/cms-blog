import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { fetchBlogsDraftStart, fetchBlogDraftSuccess, fetchBlogsDraftFailure } from '@/store/blogDraftSlice';

const BaseUrl = import.meta.env.VITE_BASE_URL;

const useGetAllBlogsDraftByUserId = (userId: string): void => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchBlogDraft = async () => {
            try {
                dispatch(fetchBlogsDraftStart())
                const response = await fetch(`${BaseUrl}/blogs/draft/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                  }
                  const responseData = await response.json();
            dispatch(fetchBlogDraftSuccess({ count: responseData.count, data: responseData.data }));
            } catch (error:any) {
                dispatch(fetchBlogsDraftFailure(error.message || 'Failed to fetch blogs'));
            }
        }
        fetchBlogDraft()
    }, [dispatch, userId])
};

export default useGetAllBlogsDraftByUserId;
