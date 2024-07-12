import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import Card from '../global/card';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

type OnlineChartProps = {
    title: string;
    labels: string[];
    dataChart: number[];
};

const OneLineChart: React.FC<OnlineChartProps> = ({
    title,
    labels,
    dataChart
}) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    } as ChartOptions<'line'>;

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
                fill: true,
                label: title,
                data: labels.map((_c, i) => {
                    return dataChart[i];
                }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(132, 199, 208, 1)'
            }
        ]
    } as ChartData<'line'>;

    return (
        <Card>
            <Line data={data} options={options} />
        </Card>
    );
};

export default OneLineChart;
