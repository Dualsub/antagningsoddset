import { AnnualAddmissionStats, Grades } from "../types";
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
};

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
    grades: Grades;
}

type ChartType = "all" | "bi" | "bii" | "hp";

export const StatisticsPlot = ({ statistics, grades }: StatisticsPlotProps) => {

    const [data, setData] = useState<ChartData | null>(null);
    const [chartType, setChartType] = useState<ChartType>("all");
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    useEffect(() => {

        const years: Array<number> = statistics.map(s => s.year);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);

        const labels = new Array(maxYear - minYear).fill(0).map((_, i) => minYear + i);
        console.log(labels);

        let datasets = gradeInfo.filter(grade => chartType !== "all" ? chartType === grade.key : true).map((grade) => ({
            label: grade.name,
            data: labels.map(l => {
                const s = statistics.find(s => s.year === l);
                return (s && s[grade.key] >= grade.min && s[grade.key] <= grade.max) ? s[grade.key] : null;
            }),
            yAxisID: grade.key !== "hp" ? "grades" : "hp",
            spanGaps: true,
            ...colors[grade.key]
        }));
        if (chartType !== "all" && grades && Object.keys(grades).includes(chartType) && grades[chartType] !== null) {
            const grade = gradeInfo.find(g => g.key === chartType);
            datasets.push({
                label: "Ditt meritvärde i " + grade.name,
                data: labels.map((_, i) => i === 0 || i === (labels.length - 1) ? grades[grade.key] : null),
                yAxisID: grade.key !== "hp" ? "grades" : "hp",
                spanGaps: true,
                borderColor: "lightgray",
                backgroundColor: "lightgray",
                fill: false,
            });
        }

        setData({
            labels,
            datasets
        });
    }, [statistics, chartType, grades]);

    return data ? <>
        <div className="px-6 py-4 sm:px-8 sm:py-6 border-[1px] rounded-xl mt-8 w-full flex flex-col justify-start">
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between w-full">
                    <h3 className="text-lg font-semibold">Betygsstatistik</h3>
                    <select defaultValue="all" className="text-sm font-semibold hidden sm:block" onChange={e => setChartType(e.target.value as ChartType)}>
                        <option value="all">Alla</option>
                        <option value="bi">BI</option>
                        <option value="bii">BII</option>
                        <option value="hp">HP</option>
                    </select>
                </div>
                <div className="h-64 md:h-fit">
                    <Line options={{ ...options, maintainAspectRatio: matches ? true : false }} data={data} className="w-full" />
                </div>
            </div>
        </div >
    </> : null;
};