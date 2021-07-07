import api from ".."
import { IStatusInfo, IUsageData } from "../../models";

export const getCpuUsage = async (): Promise<IUsageData> => (await api.get("/GetCpuUsageData")).data;

export const getMemoryUsage = async (): Promise<IUsageData> => (await api.get("/GetMemoryUsageData")).data;

export const getClusterStatusInfo = async (): Promise<IStatusInfo> => (await api.get("/GetClusterStatusInfo")).data;