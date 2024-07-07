import React, { useEffect, useState } from 'react';
import Stat from '@/components/dashboard/stat';
import BarChart from '@/components/dashboard/barChart';
import OneLineChart from '@/components/dashboard/oneLineChart';
import useGetAllBlogsByUserId from '@/hooks/blog/useGetAllBlog';
import useGetAllBlogsDraftByUserId from '@/hooks/blog/useGetAllBlogDraft'; 
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const DashboardPage: React.FC = () => {
    const [totalLike, setTotalLike] = useState<number>(0)
    const [totalView, settotalView] = useState<number>(0)
    const [totalBlog, setTotalBlog] = useState<number>(0)
    const [totalBlogDraft, setTotalBlogDraft] = useState<number>(0)

    const { Blogloading, Blogdata: blogs, Blogerror, Blogcount } = useSelector((state: RootState) => state.blog);
    const { BlogDraftloading, BlogDraftdata: blogDraft, BlogDrafterror, BlogDraftcount } = useSelector((state: RootState) => state.bloDraft);

    useGetAllBlogsByUserId('1b2e7d3c-5f6b-4a93-b9c6-3a9287c0c8de')
    useGetAllBlogsDraftByUserId('1b2e7d3c-5f6b-4a93-b9c6-3a9287c0c8de')

    useEffect(() => {
        if (blogs) {
          const totalLikes = blogs.reduce((acc, blog) => acc + blog.like.length, 0);
          const totalViews = blogs.reduce((acc, blog) => acc + blog.view.length, 0);
            
          setTotalLike(totalLikes);
          settotalView(totalViews);
          setTotalBlog(Blogcount)
          setTotalBlogDraft(BlogDraftcount)
        }
      }, [blogs, blogDraft]);
    
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
                <OneLineChart title="view" />
                <OneLineChart title="likes" />
            </section>
            <section className="flex flex-col md:flex-row gap-4">
                <BarChart />
                <BarChart />
            </section>
        </section>
    );
};

export default DashboardPage;
