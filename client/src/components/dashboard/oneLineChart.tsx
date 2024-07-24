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
    dataChart: any[]
};

const OneLineChart: React.FC<OnlineChartProps> = ({
    title,
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

    const labels = dataChart.map(item => item.month)
    const dataPoints = dataChart.map(item => item.totalLikes || item.totalView || '0')

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: title,
                data: dataPoints,
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
