
export const lineChartOptions = {
  responsive: true,
  scales: {
    y: {
      suggestedMax: 10,
      ticks: {
        stepSize: 1,
      },
      // grid: {
      //   display: false
      // }
    },
    x: {
      // grid: {
      //   display: false
      // }
    },
  },
  elements: { line: { tension: 0.4 } },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  }
};

export const horizontalBarChartOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 2,
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    }
  },
  scales: {
    x: {
      suggestedMax: 10,
      ticks: {
        stepSize: 1,
      },
      grid: {
        display: false
      }
    },
    y: {
      // grid: {
      //   display: false
      // }
    },
  },
}