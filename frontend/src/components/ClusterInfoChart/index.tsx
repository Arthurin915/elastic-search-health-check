import React from "react";
import { Pie, PieChart } from "recharts";
import ClusterInfoChartProps from "./interfaces";

const ClusterInfoChart: React.FC<ClusterInfoChartProps> = ({ status }) => {
  const data01 = [{ name: "A1", value: 100 }];
  return (
    <div>
      <div className="header">
        <h1 className="title">Cluster Status:</h1>
      </div>
      <PieChart width={120}
          height={120}>
        <Pie
          data={data01}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill={status === "green" ? "#82ca9d" : "#d43e3ede"}
        />
      </PieChart>
    </div>
  );
};

export default ClusterInfoChart;
