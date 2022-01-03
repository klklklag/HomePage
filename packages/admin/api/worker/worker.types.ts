import { BadResponseOr, WorkerData, WorkerEmail, WorkerPartnerData } from "../APIscheme";





export type WorkerAPI_readWorkerData_Params = WorkerEmail;
export type WorkerAPI_readWorkerData_Response = BadResponseOr<WorkerData>;

export type WorkerAPI_ReadWorkerPartner_Params = WorkerEmail;
export type WorkerAPI_ReadWorkerPartner_Response = BadResponseOr<WorkerPartnerData>;

export type WorkerAPI_TEMPLATE_Params = {};
export type WorkerAPI_TEMPLATE_Response = BadResponseOr<{}>;