import {
    ChartOptions
} from 'chart.js'

export const barOptions = (updated_at: Date): ChartOptions<"bar"> => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const { raw } = context;
                        return raw === 1 ? `${raw} point` : `${raw} points`;
                    }
                }
            },
            title: {
                display: true,
                text: `Last updated: ${updated_at.toLocaleString('vi-VN')}`,
            }
        },
        scales: {
            y: {
                ticks: {
                    autoSkip: false,
                }
            }
        }
    }
}