import React, { useEffect, useState } from "react";
import { getClusterStatusInfo, getCpuUsage, getMemoryUsage } from "../../api/services/healthCheck";
import CpuUsageChart from "../../components/CpuUsageChart";
import MemoryUsageChart from "../../components/MemoryUsageChart";
import { IStatusInfo, IUsageData } from "../../models";

const HealthCheck: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState({labels: [], data: []} as IUsageData);
  const [memoryUsage, setMemoryUsage] = useState({} as IUsageData);
  const [clusterInfo, setClusterInfo] = useState({} as IStatusInfo);

  const getCpuUsageData = async () => {
    setCpuUsage(await getCpuUsage());
  };
  const getMemoryData = async () => {
    setMemoryUsage(await getMemoryUsage());
  };
  const getClusterData = async () => {
    setClusterInfo(await getClusterStatusInfo());
  };

  useEffect(() => {
    getCpuUsageData();
    getMemoryData();
    getClusterData();
  }, []);
  return (
    <div>
      <CpuUsageChart labelsData={cpuUsage.labels} chartData={cpuUsage.data}></CpuUsageChart>
      <MemoryUsageChart labelsData={memoryUsage.labels} chartData={memoryUsage.data}></MemoryUsageChart>
    </div>
  );
};

export default HealthCheck;
