import { useState } from "react";

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetAllBlogsDraft {
    getAllBLogDraftLoading: boolean
    getAllBlogDraftErrMessage: string
    allBlogDraft: any
    getAllBlogDraftByUserId: (userId: string) => Promise<void>
}

const useGetAllBlogsDraftByUserId = ():UseGetAllBlogsDraft  => {
    const [getAllBLogDraftLoading, setgetAllBLogDraftLoading] = useState<boolean>(false)
    const [getAllBlogDraftErrMessage, setGetAllBlogDraftErrMessage] = useState<string>('')
    const [allBlogDraft, setallBlogDraft] = useState<any>(null)

    const getAllBlogDraftByUserId = async(userId: string): Promise<void> => {
        setgetAllBLogDraftLoading(true)
        try {
            const response = await fetch(`${BaseUrl}/blogs/draft/${userId}`)

            if(!response.ok) {
                throw new Error('Failed to fetch draft blog')
            }
            const data = await response.json()
            setallBlogDraft(data)
        } catch (error: any) {
            setGetAllBlogDraftErrMessage(error.message)
            console.error('Error fetching data draft')
        } finally {
            setgetAllBLogDraftLoading(false)
        }
    }
    return {allBlogDraft, getAllBlogDraftErrMessage, getAllBLogDraftLoading, getAllBlogDraftByUserId}
};

export default useGetAllBlogsDraftByUserId;
