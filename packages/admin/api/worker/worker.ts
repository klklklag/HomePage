import { apiClient } from "../APIbase";
import {
  WorkerAPI_readWorkerData_Params,
  WorkerAPI_readWorkerData_Response,
  WorkerAPI_ReadWorkerPartner_Params,
  WorkerAPI_ReadWorkerPartner_Response,
} from "./worker.types";

const subURL = '/worker';





const readWorkerData = async ({ workerEmail }: WorkerAPI_readWorkerData_Params) => {
  const { data } = await apiClient.get<WorkerAPI_readWorkerData_Response>(subURL + '/info/' + workerEmail);

  return data;
};

const readWorkerPartnerData = async ({ workerEmail }: WorkerAPI_ReadWorkerPartner_Params) => {
  const { data } = await apiClient.get<WorkerAPI_ReadWorkerPartner_Response>(subURL + '/info/partner/' + workerEmail);

  return data;
};





export const workerAPI = {
  readWorkerData,
  readWorkerPartnerData,
};