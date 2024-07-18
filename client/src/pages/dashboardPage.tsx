import React, { useEffect, useState } from 'react';
import Stat from '@/components/dashboard/stat';
import BarChart from '@/components/dashboard/barChart';
import OneLineChart from '@/components/dashboard/oneLineChart';
import useGetAllBlogsByUserId from '@/hooks/blog/useGetAllBlog';
import useGetAllBlogsDraftByUserId from '@/hooks/blog/useGetAllBlogDraft';
import useTotalLikePerMonth from '@/hooks/like/useGetTotalLike';
import useTotalViewPerMonth from '@/hooks/view/useGetTotalView';
import useMostFavTag from '@/hooks/like/useGetFavTag';
import useGetMostViewedBlogByUserId from '@/hooks/blog/useGetBlogMostView';
import { useAuthContext } from '@/context/authContext';
import showToast from '@/utils/toastify';

const DashboardPage: React.FC = () => {
    const [totalLike, setTotalLike] = useState<number>(0);
    const [totalView, settotalView] = useState<number>(0);
    const [totalBlog, setTotalBlog] = useState<number>(0);

    const [totalLikePerMonth, setTotalLikePerMonth] = useState<number[]>([]);
    const [totalViewPerMonth, setTotalViewPerMonth] = useState<number[]>([]);
    const [favTagLikes, setFavTagLikes] = useState<number[]>([]);
    const [mostView, setMostView] = useState<number[]>([]);

    const [labelLikePerMonth, setLabelLikePerMonth] = useState<string[]>([]);
    const [labeltotalViewPerMonth, setLabelViewPerMonth] = useState<string[]>(
        []
    );
    const [labelFavTag, setlabelFavTag] = useState<string[]>([]);
    const [labelMostView, setLabelMostView] = useState<string[]>([]);

    const [totalBlogDraft, setTotalBlogDraft] = useState<number>(0);

    const {
        TotalLikeLoading,
        TotalLikeErrMessage,
        TotalLikePerMonth,
        getTotalLikePerMonthByUserId
    } = useTotalLikePerMonth();
    const {
        TotalViewLoading,
        TotalViewErrMessage,
        TotalViewPerMonth,
        getTotalViewPerMonthByUserId
    } = useTotalViewPerMonth();
    const { getAllBlogLoading, getAllErrMessage, allBLog, getAllBlogByUserId } =
        useGetAllBlogsByUserId();
    const {
        getAllBLogDraftLoading,
        getAllBlogDraftErrMessage,
        allBlogDraft,
        getAllBlogDraftByUserId
    } = useGetAllBlogsDraftByUserId();
    const { FavTagLoading, FavTagErrMessage, FavTag, getMostFavTag } =
        useMostFavTag();
    const {
        ViewdLoading,
        ViewdErrMessage,
        mostViewedBlog,
        getMostViewedBlogByUserId
    } = useGetMostViewedBlogByUserId();

    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser?.userId) {
            getAllBlogByUserId(authUser.userId);
            getAllBlogDraftByUserId(authUser.userId);
        } else {
            showToast(
                'User Not Authenticated. Please refresh this page',
                'error'
            );
        }
    }, [authUser]);

    useEffect(() => {
        if (allBLog) {
            const totalLikes = allBLog.reduce(
                (acc: any, blog: { liked: string | any[] }) =>
                    acc + blog.liked.length,
                0
            );
            const totalViews = allBLog.reduce(
                (acc: any, blog: { view: string | any[] }) =>
                    acc + blog.view.length,
                0
            );

            if (authUser?.userId) {
                getTotalLikePerMonthByUserId(authUser.userId);
                getTotalViewPerMonthByUserId(authUser.userId);
                getMostViewedBlogByUserId(authUser.userId);
                getMostFavTag();
            } else {
                showToast(
                    'User Not Authenticated. Please refresh this page',
                    'error'
                );
            }

            setTotalLike(totalLikes);
            settotalView(totalViews);
            setTotalBlog(allBLog.length);
            setTotalBlogDraft(allBlogDraft.length);
        }
    }, [allBLog, allBlogDraft, authUser]);

    useEffect(() => {
        if (TotalLikePerMonth) {
            const likePerMonth = TotalLikePerMonth.data.map(
                (like: { totalLikes: number }) => like.totalLikes
            );
            const likeLabel = TotalLikePerMonth.data.map(
                (like: { month: string }) => like.month
            );

            setTotalLikePerMonth(likePerMonth);
            setLabelLikePerMonth(likeLabel);
        }

        if (TotalViewPerMonth) {
            const viewPerMonth = TotalViewPerMonth.data.map(
                (view: { totalView: number }) => view.totalView
            );
            const viewLabel = TotalViewPerMonth.data.map(
                (view: { month: string }) => view.month
            );

            setTotalViewPerMonth(viewPerMonth);
            setLabelViewPerMonth(viewLabel);
        }

        if (FavTag) {
            const favTags = FavTag.map(
                (fav: { totalLikes: number }) => fav.totalLikes
            );
            const favLabels = FavTag.map((fav: { tag: string }) => fav.tag);

            setFavTagLikes(favTags);
            setlabelFavTag(favLabels);
        }

        if (mostViewedBlog) {
            const mostViewedBlogs = mostViewedBlog.map(
                (mostView: { viewCount: number }) => mostView.viewCount
            );
            const mostViewedBlogLabels = mostViewedBlog.map(
                (mostView: { blog_title: string }) => mostView.blog_title
            );

            setMostView(mostViewedBlogs);
            setLabelMostView(mostViewedBlogLabels);
        }
    }, [
        TotalLikePerMonth,
        TotalViewPerMonth,
        FavTag,
        mostViewedBlog,
        authUser
    ]);

    // Error handling using toastify
    useEffect(() => {
        if (getAllErrMessage) {
            showToast(
                `${getAllErrMessage}. Please refresh this page.`,
                'error'
            );
        }
        if (getAllBlogDraftErrMessage) {
            showToast(
                `${getAllBlogDraftErrMessage}. Please refresh this page.`,
                'error'
            );
        }
        if (TotalViewErrMessage) {
            showToast(
                `${TotalViewErrMessage}. Please refresh this page.`,
                'error'
            );
        }
        if (TotalLikeErrMessage) {
            showToast(
                `${TotalLikeErrMessage}. Please refresh this page.`,
                'error'
            );
        }
        if (FavTagErrMessage) {
            showToast(
                `${FavTagErrMessage}. Please refresh this page.`,
                'error'
            );
        }
        if (ViewdErrMessage) {
            showToast(`${ViewdErrMessage}. Please refresh this page.`, 'error');
        }
    }, [
        getAllErrMessage,
        getAllBlogDraftErrMessage,
        TotalViewErrMessage,
        TotalLikeErrMessage,
        FavTagErrMessage,
        ViewdErrMessage
    ]);

    if (getAllBlogLoading) {
        return <div>{getAllBlogLoading}</div>;
    }

    if (getAllBLogDraftLoading) {
        return <div>{getAllBLogDraftLoading}</div>;
    }

    if (TotalLikeLoading) {
        return <div>{TotalLikeLoading}</div>;
    }

    if (TotalViewLoading) {
        return <div>{TotalViewLoading}</div>;
    }

    if (FavTagLoading) {
        return <div>{FavTagLoading}</div>;
    }

    if (ViewdLoading) {
        return <div>{ViewdLoading}</div>;
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
                    title="favorite tags"
                    labels={labelFavTag}
                    dataChart={favTagLikes}
                />
                <BarChart
                    title="most popular blog"
                    labels={labelMostView}
                    dataChart={mostView}
                />
            </section>
        </section>
    );
};

export default DashboardPage;
