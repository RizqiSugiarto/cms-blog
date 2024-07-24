import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import type { ChartData, ChartOptions } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import Card from '@/components/global/card';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type BarChartProps = {
    title: string;
    dataChart: any[];
};

const BarChart: React.FC<BarChartProps> = ({ title, dataChart }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    } as ChartOptions<'bar'>;

    const labels = dataChart.map(item => item.tag || item.blog_title)
    const dataPoint = dataChart.map(item => item.totalLikes || item.viewCount)

    const data = {
        labels,
        datasets: [
            {
                label: title,
                data: dataPoint,
                backgroundColor: 'rgba(146, 151, 196, 1)'
            }
        ]
    } as ChartData<'bar'>;

    return (
        <Card>
            <Bar options={options} data={data} />
        </Card>
    );
};

export default BarChart;
