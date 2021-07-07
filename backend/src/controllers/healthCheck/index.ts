import { Request, Response } from "express";
import { IStatusInfo, IUsageData } from "../../types";
import axios from "axios";

export const getCpuUsageData = async (req: Request, res: Response) => {
  try {
    const {data} = await axios.get<IUsageData>("https://run.mocky.io/v3/b1bc5162-7cf2-4599-b1f5-e3bd58fcf07f");
    
    if(!data)
      return res.status(404).json({error: "Error obtaining cpu usage data"});
    return res.status(200).json(data);
  } catch (ex) {
    res.status(500).send(ex);
  }
}

export const getMemoryUsageData = async (req: Request, res: Response) => {
  try {
    const {data} = await axios.get<IUsageData>("https://run.mocky.io/v3/d23c3262-967e-4567-b7f6-2fd263748811");
    if(!data)
      return res.status(404).json({error: "Error obtaining memory usage data"});

    return res.status(200).json(data);
  } catch (ex) {
    res.status(500).send(ex);
  }
}

export const getClusterStatusInfo = async (req: Request, res: Response) => {
  try {
    const {data} = await axios.get<IStatusInfo>("https://run.mocky.io/v3/cab2791c-7c85-4461-b95c-86bc1a12dc72");
    if(!data)
      return res.status(404).json({error: "Error obtaining cluster status info"});
    return res.status(200).json(data);
  } catch (ex) {
    res.status(500).send(ex);
  }
}