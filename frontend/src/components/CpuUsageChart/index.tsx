import React from "react";
import { Line } from "react-chartjs-2";
import CpuUsageChartProps from "./interfaces";

const CpuUsageChart: React.FC<CpuUsageChartProps> = ({ labelsData, chartData }) => {
  const data = {
    labels: labelsData,
    datasets: [
      {
        label: 'CPU Usage',
        data: chartData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <div className="header">
        <h1 className="title">CPU Usage</h1>
      </div>
      <Line data={data} options={options} type="" />
    </>
  );
};

export default CpuUsageChart;
