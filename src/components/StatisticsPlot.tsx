import { AnnualAddmissionStats } from "../types"
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import gradeInfo from "../gradeInfo";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export const options = {
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    plugins: {
        title: {
            display: false,
        },
    },
    scales: {
        grades: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
        },
        hp: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
                drawOnChartArea: false,
            },
        },
    },
};

const colors = {
    bi: {
        borderColor: "#4ade80",
        backgroundColor: "#4ade80",
    },
    bii: {
        borderColor: "#b0b0b0",
        backgroundColor: "#b0b0b0",
    },
    hp: {
        borderColor: "#2463eb",
        backgroundColor: "#2463eb",
    },
}

interface ChartData {
    labels: Array<number | string>;
    datasets: Array<{
        label: string;
        data: Array<number>;
        yAxisID: string;
        borderColor?: string;
        backgroundColor?: string;
        spanGaps: boolean;
    }>;
}

interface StatisticsPlotProps {
    statistics: Array<AnnualAddmissionStats>;
}

export const StatisticsPlot = ({ statistics }: StatisticsPlotProps) => {

    const [data, setData] = useState<ChartData | null>(null);

    useEffect(() => {

        const years: Array<number> = statistics.map(s => s.year);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);

        const labels = new Array(maxYear - minYear).fill(0).map((_, i) => minYear + i);
        console.log(labels);
        setData({
            labels,
            datasets: gradeInfo.map((grade) => ({
                label: grade.name,
                data: labels.map(l => {
                    const s = statistics.find(s => s.year === l);
                    return s ? s[grade.key] : null;
                }),
                yAxisID: grade.key !== "hp" ? "grades" : "hp",
                spanGaps: true,
                ...colors[grade.key]
            }))
        })
    }, [statistics])

    return data ? <div className="px-8 py-6 border-[1px] rounded-xl mt-8 w-full flex flex-col justify-start">
        <div className="flex flex-col w-full">
            <h3 className="text-lg font-semibold">Betygsstatistik</h3>
            <Line options={options} data={data} className="w-full" />
        </div>
    </div > : null;
}