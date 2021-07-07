import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  getClusterStatusInfo,
  getCpuUsage,
  getMemoryUsage,
} from "../../api/services/healthCheck";
import ClusterInfoChart from "../../components/ClusterInfoChart";
import CpuUsageChart from "../../components/CpuUsageChart";
import MemoryUsageChart from "../../components/MemoryUsageChart";
import { IStatusInfo, IUsageChart } from "../../models";

const HealthCheck: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState([
    { name: "", usage: 0 },
  ] as IUsageChart[]);
  const [memoryUsage, setMemoryUsage] = useState([
    { name: "", usage: 0 },
  ] as IUsageChart[]);
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
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={5}>
        <CpuUsageChart data={cpuUsage}/>
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
        <MemoryUsageChart data={memoryUsage}/>
      </Grid>
      <Grid item xs={12} sm={12} md={2}>
        <ClusterInfoChart status={clusterInfo.status}/>
      </Grid>
    </Grid>
  );
};

export default HealthCheck;
