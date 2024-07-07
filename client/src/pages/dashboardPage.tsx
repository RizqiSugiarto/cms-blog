import React, { useEffect, useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Stat from '@/components/dashboard/stat';
import BarChart from '@/components/dashboard/barChart';
import OneLineChart from '@/components/dashboard/oneLineChart';
import useGetAllBlogsByUserId from '@/hooks/blog/useGetAllBlog';
import useGetAllBlogsDraftByUserId from '@/hooks/blog/useGetAllBlogDraft'; 
import useTotalLikePerMonth from '@/hooks/like/useGetTotalLike';
import useTotalViewPerMonth from '@/hooks/view/useGetTotalView';
import useMostFavTag from '@/hooks/like/useGetFavTag';
import useGetMostViewedBlogByUserId from '@/hooks/blog/useGetBlogMostView';

const DashboardPage: React.FC = () => {
    const [totalLike, setTotalLike] = useState<number>(0)
    const [totalView, settotalView] = useState<number>(0)
    const [totalBlog, setTotalBlog] = useState<number>(0)

    const [totalLikePerMonth, setTotalLikePerMonth] = useState<number[]>([])
    const [totalViewPerMonth, setTotalViewPerMonth] = useState<number[]>([])
    const [favTagLikes, setFavTagLikes] = useState<number[]>([])
    const [mostView, setMostView] = useState<number[]>([])

    const [labelLikePerMonth, setLabelLikePerMonth] = useState<string[]>([])
    const [labeltotalViewPerMonth, setLabelViewPerMonth] = useState<string[]>([])
    const [labelFavTag, setlabelFavTag] = useState<string[]>([])
    const [labelMostView, setLabelMostView] = useState<string[]>([])

    const [totalBlogDraft, setTotalBlogDraft] = useState<number>(0)

    const {TotalLikeLoading, TotalLikeErrMessage, TotalLikePerMonth, getTotalLikePerMonthByUserId} = useTotalLikePerMonth()
    const {TotalViewLoading, TotalViewErrMessage, TotalViewPerMonth, getTotalViewPerMonthByUserId} = useTotalViewPerMonth()
    const {FavTagLoading, FavTagErrMessage, FavTag, getMostFavTag} = useMostFavTag()
    const {ViewdLoading, ViewdErrMessage, mostViewedBlog, getMostViewedBlogByUserId} = useGetMostViewedBlogByUserId()

    const { Blogloading, Blogdata: blogs, Blogerror, Blogcount } = useSelector((state: RootState) => state.blog);
    const { BlogDraftloading, BlogDraftdata: blogDraft, BlogDrafterror, BlogDraftcount } = useSelector((state: RootState) => state.bloDraft);


    useGetAllBlogsByUserId('1b2e7d3c-5f6b-4a93-b9c6-3a9287c0c8de')
    useGetAllBlogsDraftByUserId('1b2e7d3c-5f6b-4a93-b9c6-3a9287c0c8de')

    useEffect(() => {
        if (blogs) {
          
          const totalLikes = blogs.reduce((acc, blog) => acc + blog.like.length, 0);
          const totalViews = blogs.reduce((acc, blog) => acc + blog.view.length, 0);

          getTotalLikePerMonthByUserId('1b2e7d3c-5f6b-4a93-b9c6-3a9287c0c8de')
          getTotalViewPerMonthByUserId('1b2e7d3c-5f6b-4a93-b9c6-3a9287c0c8de')
          getMostViewedBlogByUserId('1b2e7d3c-5f6b-4a93-b9c6-3a9287c0c8de')
          getMostFavTag()

          
          setTotalLike(totalLikes);
          settotalView(totalViews);
          setTotalBlog(Blogcount)
          setTotalBlogDraft(BlogDraftcount)
        }
      }, [blogs, blogDraft]);

      useEffect(() => {
        if (TotalLikePerMonth) {
            const likePerMonth = TotalLikePerMonth.data.map((like: { totalLikes: number }) => like.totalLikes);
            const likeLabel = TotalLikePerMonth.data.map((like: {month: string}) => like.month)
            
            setTotalLikePerMonth(likePerMonth);
            setLabelLikePerMonth(likeLabel)
        }

        if (TotalViewPerMonth) {
            const viewPerMonth = TotalViewPerMonth.data.map((view: { totalView: number }) => view.totalView);
            const viewLabel = TotalViewPerMonth.data.map((view: {month: string}) => view.month)

            setTotalViewPerMonth(viewPerMonth);
            setLabelViewPerMonth(viewLabel)
        }

        if (FavTag) {
            const favTags= FavTag.map((fav: { totalLikes: number }) => fav.totalLikes);
            const favLabels = FavTag.map((fav: {tag: string}) => fav.tag)

            setFavTagLikes(favTags);
            setlabelFavTag(favLabels)
        }

        if (mostViewedBlog) {
            const mostViewedBlogs= mostViewedBlog.map((mostView: { viewCount: number }) => mostView.viewCount);
            const mostViewedBlogLabels = mostViewedBlog.map((mostView: {blog_title: string}) => mostView.blog_title)

            setMostView(mostViewedBlogs);
            setLabelMostView(mostViewedBlogLabels)
        }
        
    }, [TotalLikePerMonth, TotalViewPerMonth, FavTag, mostViewedBlog]);
    
    if(Blogloading) {
        return (
            <div>
                {Blogloading}
            </div>
        )
    }

    if(BlogDraftloading) {
        return (
            <div>
                {Blogloading}
            </div>
        )
    }

    if(TotalLikeLoading) {
        return (
            <div>
                {Blogloading}
            </div>
        )
    }

    if(TotalViewLoading) {
        return (
            <div>
                {Blogloading}
            </div>
        )
    }

    if(FavTagLoading) {
        return (
            <div>
                {FavTagLoading}
            </div>
        )
    }

    if(ViewdLoading) {
        return (
            <div>
                {ViewdLoading}
            </div>
        )
    }

    if(Blogerror) {
        return (
            <div>
                {Blogerror}
            </div>
        )
    }

    if(BlogDrafterror) {
        return (
            <div>
                {Blogerror}
            </div>
        )
    }

    if(TotalViewErrMessage) {
        return (
            <div>
                {Blogerror}
            </div>
        )
    }

    if(TotalLikeErrMessage) {
        return (
            <div>
                {Blogerror}
            </div>
        )
    }

    if(FavTagErrMessage) {
        return (
            <div>
                {FavTagErrMessage}
            </div>
        )
    }

    if(ViewdErrMessage) {
        return (
            <div>
                {ViewdErrMessage}
            </div>
        )
    }

    return (
        <section className="space-y-5">
            <section className="flex flex-col md:flex-row gap-4">
                <Stat
                    icon={<i className="bi bi-pen"></i>}
                    title="Blog"
                    value={String(totalBlog)}
                    desc="From January 1st to February 1st"
                />
                <Stat
                    icon={<i className="bi bi-eye"></i>}
                    title="View"
                    value={String(totalView)}
                    desc="↗︎ 90 (14%)"
                />
                <Stat
                    icon={<i className="bi bi-file-earmark-break"></i>}
                    title="Draft"
                    value={String(totalBlogDraft)}
                    desc="↗︎ 40 (2%)"
                />
                <Stat
                    icon={<i className="bi bi-hand-thumbs-up"></i>}
                    title="Liked"
                    value={String(totalLike)}
                    desc="↘︎ 90 (0.5%)"
                />
            </section>
            <section className="flex flex-col md:flex-row gap-4">
                <OneLineChart 
                    title="view"
                    labels={labeltotalViewPerMonth}
                    dataChart={totalViewPerMonth} 
                />
                <OneLineChart 
                    title="likes"
                    labels={labelLikePerMonth}
                    dataChart={totalLikePerMonth} 
                />
            </section>
            <section className="flex flex-col md:flex-row gap-4">
                <BarChart 
                    title='favorite tags'
                    labels={labelFavTag}
                    dataChart={favTagLikes}
                />
                <BarChart 
                    title='most popular blog'
                    labels={labelMostView}
                    dataChart={mostView}
                />
            </section>
        </section>
    );
};

export default DashboardPage;
