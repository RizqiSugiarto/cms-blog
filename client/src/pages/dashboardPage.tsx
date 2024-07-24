import { useEffect } from 'react';
import Stat from '@/components/dashboard/stat';
import BarChart from '@/components/dashboard/barChart';
import OneLineChart from '@/components/dashboard/oneLineChart';
import { useAuthContext } from '@/context/authContext';
import useGetBlogStatssByUserId from '@/hooks/blog/useGetStatsBlog';

const DashboardPage: React.FC = () => {
    const { getBlogStatsErrMessage, getBlogStatsLoading, getBlogStatsByUserId, statsBLog } = useGetBlogStatssByUserId();
    const { authUser } = useAuthContext();

    useEffect(() => {
        const initialFetch = async () => {
            if (authUser?.userId) {
                await getBlogStatsByUserId(authUser.userId);
            }
        }
        initialFetch()
    }, [authUser?.userId]);

    useEffect(() => {
        if (getBlogStatsErrMessage) {
            console.log(getBlogStatsErrMessage);
        }
    }, [getBlogStatsErrMessage]);

  

    if (!statsBLog || getBlogStatsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="space-y-5">
            <section className="flex flex-col md:flex-row gap-4">
                <Stat
                    icon={<i className="bi bi-pen"></i>}
                    title="Blog"
                    value={String(statsBLog.totalBlog)}
                    desc="From January 1st to February 1st"
                />
                <Stat
                    icon={<i className="bi bi-eye"></i>}
                    title="View"
                    value={String(statsBLog.totalView)}
                    desc="↗︎ 90 (14%)"
                />
                <Stat
                    icon={<i className="bi bi-file-earmark-break"></i>}
                    title="Draft"
                    value={String(statsBLog.totalDraft)}
                    desc="↗︎ 40 (2%)"
                />
                <Stat
                    icon={<i className="bi bi-hand-thumbs-up"></i>}
                    title="Liked"
                    value={String(statsBLog.totalLike)}
                    desc="↘︎ 90 (0.5%)"
                />
            </section>
            <section className="flex flex-col md:flex-row gap-4">
                <OneLineChart
                    title="view"
                    dataChart={statsBLog.totalViewPerMonth}
                />
                <OneLineChart
                    title="likes"
                    dataChart={statsBLog.totalLikesPerMonth}
                />
            </section>
            <section className="flex flex-col md:flex-row gap-4">
                <BarChart
                    title="favorite tags"
                    dataChart={statsBLog.mostLikedTag}
                />
                <BarChart
                    title="most popular blog"
                    dataChart={statsBLog.mostViewBlog}
                />
            </section>
        </section>
    );
};

export default DashboardPage;
