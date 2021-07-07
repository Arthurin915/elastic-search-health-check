import api from ".."
import { IStatusInfo, IUsageChart } from "../../models";

export const getCpuUsage = async (): Promise<IUsageChart[]> => (await api.get("/GetCpuUsageData")).data;

export const getMemoryUsage = async (): Promise<IUsageChart[]> => (await api.get("/GetMemoryUsageData")).data;

export const getClusterStatusInfo = async (): Promise<IStatusInfo> => (await api.get("/GetClusterStatusInfo")).data;