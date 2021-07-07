import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import CpuUsageChartProps from "./interfaces";

const CpuUsageChart: React.FC<CpuUsageChartProps> = ({ data }) => {
  return (
    <div>
      <div className="header">
        <h1 className="title">CPU Usage</h1>
      </div>
      <AreaChart
        width={300}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="usage" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
};

export default CpuUsageChart;
