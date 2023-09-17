export const barOptions = {
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