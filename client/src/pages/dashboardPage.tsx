import React from 'react';
import Stat from '@/components/dashboard/stat';
import BarChart from '@/components/dashboard/barChart';
import OneLineChart from '@/components/dashboard/oneLineChart';

const DashboardPage: React.FC = () => {
    return (
        <section className="space-y-5">
            <section className="flex flex-col md:flex-row gap-4">
                <Stat icon={<i className="bi bi-pen"></i>} title="Blog" value="31k" desc="From January 1st to February 1st"  />
                <Stat icon={<i className="bi bi-eye"></i>} title="View" value="1,568,848,200" desc="↗︎ 90 (14%)"  />
                <Stat icon={<i className="bi bi-file-earmark-break"></i>} title="Draft" value="500" desc="↗︎ 40 (2%)"  />
                <Stat icon={<i className="bi bi-hand-thumbs-up"></i>} title="Liked" value="1,200" desc="↘︎ 90 (0.5%)"  />
            </section>
            <section className="flex flex-col md:flex-row gap-4">
                <BarChart />
                <BarChart />
            </section>
            <section className="flex flex-col md:flex-row gap-4">
                <OneLineChart title='view' />
                <OneLineChart title='likes'/>
            </section>
        </section>
    )
};

export default DashboardPage;
