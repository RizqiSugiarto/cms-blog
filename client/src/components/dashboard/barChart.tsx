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
    title: string
    labels: string[]
    dataChart: number[]
}

const BarChart: React.FC<BarChartProps> = ({title, labels, dataChart}) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    } as ChartOptions<'bar'>;

    // const labels = [
    //     'January',
    //     'February',
    //     'March',
    //     'April',
    //     'May',
    //     'June',
    //     'July'
    // ];

    const data = {
        labels,
        datasets: [
            {
                label: title,
                data: labels.map((_c, i) => {
                    return dataChart[i];
                }),
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
