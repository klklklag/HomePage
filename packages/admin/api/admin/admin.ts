import { apiClient, formDataHeader } from "api/APIbase";
import {
  AdminAPI_ReadPartnerList_Response,
  AdminAPI_ReadPartnerData_Params,
  AdminAPI_ReadPartnerData_Response,
  AdminAPI_ReadWorkerInfo_Params,
  AdminAPI_ReadWorkerInfo_Response,
  AdminAPI_ReadFAQList_Params,
  AdminAPI_ReadFAQList_Response,
  AdminAPI_readPartnerThanksPayAll_Params,
  AdminAPI_readPartnerThanksPayAll_Response,
  AdminAPI_ReadWorkerThanksPayAll_Params,
  AdminAPI_ReadWorkerThanksPayAll_Response,
  AdminAPI_ReadAffiliationDataAll_Params,
  AdminAPI_ReadAffiliationDataAll_Response,
  AdminAPI_ReadWorkerDataAll_Params,
  AdminAPI_ReadWorkerDataAll_Response,
  AdminAPI_ReadPartnerInvoiceList_Params,
  AdminAPI_ReadPartnerInvoiceList_Response,
  AdminAPI_ReadPartnerInvoiceDetail_Params,
  AdminAPI_ReadPartnerInvoiceDetail_Response,
  AdminAPI_ReadPartnerDepositList_Params,
  AdminAPI_ReadPartnerDepositList_Response,
  AdminAPI_SendThanksPayToWorker_Params,
  AdminAPI_SendThanksPayToWorker_Response,
  AdminAPI_SendDepositFromPartner_Params,
  AdminAPI_SendDepositFromPartner_Response,
  AdminAPI_CreateQNAReply_Params,
  AdminAPI_CreateQNAReply_Response,
  AdminAPI_SetWorkerOverdue_Params,
  AdminAPI_SetWorkerOverdue_Response,
  AdminAPI_SendEmailAuth_Params,
  AdminAPI_SendEmailAuth_Response,
  AdminAPI_UpdateWorkerFailureCount_Params,
  AdminAPI_UpdateWorkerFailureCount_Response,
  AdminAPI_ReadPartnerThanksPayList_Params,
  AdminAPI_ReadPartnerThanksPayList_Response,
  AdminAPI_ReadPartnerWorkerAll_Params,
  AdminAPI_ReadPartnerWorkerAll_Response,
  AdminAPI_UpdateWorkerState_Params,
  AdminAPI_UpdateWorkerState_Response,
  AdminAPI_ReadPartnerDepositDetail_Params,
  AdminAPI_ReadPartnerDepositDetail_Response,
  AdminAPI_UpdatePartnerData_Params,
  AdminAPI_UpdatePartnerData_Response,
  AdminAPI_RegisterVirtualAccount_Response,
  AdminAPI_RegisterVirtualAccount_Params,
  AdminAPI_UpdateWorkerData_Params,
  AdminAPI_UpdateWorkerData_Response,
  AdminAPI_ReadWorkerThanksPayLog_Params,
  AdminAPI_ReadWorkerThanksPayLog_Response,
} from "./admin.types";

const subURL = '/admin';





const readPartnerAll = async () => {
  const { data } = await apiClient.get<AdminAPI_ReadPartnerList_Response>(subURL + '/partner/all');

  return data;
};

const readPartner = async ({ partnerLicenseId }: AdminAPI_ReadPartnerData_Params) => {
  const { data } = await apiClient.get<AdminAPI_ReadPartnerData_Response>(subURL + '/info/partner/' + partnerLicenseId);

  return data;
};

const readWorkerInfo = async ({ partnerLicenseId, workerEmail }: AdminAPI_ReadWorkerInfo_Params) => {
  const { data } = await apiClient.get<AdminAPI_ReadWorkerInfo_Response>(`${subURL}/info/worker/${partnerLicenseId}/${workerEmail}`);

  return data;
};

const readFAQList = async () => {
  const { data } = await apiClient.get<AdminAPI_ReadFAQList_Response>(subURL + '/info/faq');

  return data;
};

const readPartnerThanksPayAll = async (params: AdminAPI_readPartnerThanksPayAll_Params) => {
  const { data } = await apiClient.get<AdminAPI_readPartnerThanksPayAll_Response>(subURL + '/thanksPay/partner/all', { params });

  return data;
};

const readPartnerThanksPayList = async ({ partnerLicenseId, ...params }: AdminAPI_ReadPartnerThanksPayList_Params) => {
  const { data } = await apiClient.get<AdminAPI_ReadPartnerThanksPayList_Response>(subURL + '/thanksPay/partner/' + partnerLicenseId, { params });

  return data;
};

const readWorkerThanksPayAll = async ({ workerEmail }: AdminAPI_ReadWorkerThanksPayAll_Params) => {
  const { data } = await apiClient.get<AdminAPI_ReadWorkerThanksPayAll_Response>(subURL + '/thanksPay/worker/' + workerEmail);

  return data;
};

const readAffiliationDataAll = async () => {
  const { data } = await apiClient.get<AdminAPI_ReadAffiliationDataAll_Response>(subURL + '/partnership/all');

  return data;
};

const readPartnerWorkerAll = async ({ partnerLicenseId }: AdminAPI_ReadPartnerWorkerAll_Params) => {
  const { data } = await apiClient.get<AdminAPI_ReadPartnerWorkerAll_Response>(subURL + '/partner/workers/' + partnerLicenseId);

  return data;
};

const readWorkerDataAll = async () => {
  const { data } = await apiClient.get<AdminAPI_ReadWorkerDataAll_Response>(subURL + '/user/all');

  return data;
};

const readPartnerInvoiceList = async ({ partnerLicenseId, ...params }: AdminAPI_ReadPartnerInvoiceList_Params) => {
  const { data } = await apiClient.get<AdminAPI_ReadPartnerInvoiceList_Response>(subURL + '/invoice/partner/' + partnerLicenseId, { params });

  return data;
};

const readPartnerInvoiceDetail = async ({ partnerLicenseId, ...params }: AdminAPI_ReadPartnerInvoiceDetail_Params) => {
  const { data } = await apiClient.get<AdminAPI_ReadPartnerInvoiceDetail_Response>(subURL + '/invoice/partner/detail/' + partnerLicenseId, { params });

  return data;
};

const readPartnerDepositList = async ({ partnerLicenseId, ...params }: AdminAPI_ReadPartnerDepositList_Params) => {
  const { data } = await apiClient.get<AdminAPI_ReadPartnerDepositList_Response>(subURL + '/deposit/partner/' + partnerLicenseId, { params });

  return data;
};

const readPartnerDepositDetail = async ({ partnerLicenseId, ...params }: AdminAPI_ReadPartnerDepositDetail_Params) => {
  const { data } = await apiClient.get<AdminAPI_ReadPartnerDepositDetail_Response>(subURL + '/deposit/partner/detail/' + partnerLicenseId, { params });

  return data;
};

const readWorkerThanksPayLog = async ({ workerEmail }: AdminAPI_ReadWorkerThanksPayLog_Params) => {
  const { data } = await apiClient.get<AdminAPI_ReadWorkerThanksPayLog_Response>(`${subURL}/thanksPay/worker/${workerEmail}`);

  return data;
};





const sendThanksPayToWorker = async (params: AdminAPI_SendThanksPayToWorker_Params) => {
  const { data } = await apiClient.post<AdminAPI_SendThanksPayToWorker_Response>(subURL + '/send/worker', params);

  return data;
};

const sendDepositFromPartner = async (params: AdminAPI_SendDepositFromPartner_Params) => {
  const { data } = await apiClient.post<AdminAPI_SendDepositFromPartner_Response>(subURL + '/deposit/partner', params);

  return data;
};

const setWorkerOverdue = async (params: AdminAPI_SetWorkerOverdue_Params) => {
  const { data } = await apiClient.post<AdminAPI_SetWorkerOverdue_Response>(subURL + '/overdue/worker', params);

  return data;
};

const createQNAReply = async (params: AdminAPI_CreateQNAReply_Params) => {
  const { data } = await apiClient.post<AdminAPI_CreateQNAReply_Response>(subURL + '/qna/reply', params);

  return data;
};

const sendEmailAuth = async ({ email }: AdminAPI_SendEmailAuth_Params) => {
  const { data } = await apiClient.post<AdminAPI_SendEmailAuth_Response>(subURL + '/auth/email/' + email);

  return data;
};

const registerVirtualAccount = async ({ partnerLicenseId, ...params }: AdminAPI_RegisterVirtualAccount_Params) => {
  const formData = new FormData();
  for (const objKey in params) {
    const key = objKey as keyof typeof params;
    formData.append(key, params[key]);
  }

  const { data } = await apiClient.post<AdminAPI_RegisterVirtualAccount_Response>(subURL + '/virtualAccount/' + partnerLicenseId, formData, { headers: formDataHeader });

  return data;
};





const updateWorkerPasswordFailureCount = async ({ workerEmail, ...params }: AdminAPI_UpdateWorkerFailureCount_Params) => {
  const { data } = await apiClient.patch<AdminAPI_UpdateWorkerFailureCount_Response>(`${subURL}/password/${workerEmail}/failureCount`, params);

  return data;
};

const updateWorkerState = async ({ workerEmail, ...params }: AdminAPI_UpdateWorkerState_Params) => {
  const { data } = await apiClient.patch<AdminAPI_UpdateWorkerState_Response>(`${subURL}/worker/state/${workerEmail}`, params);

  return data;
};

const updatePartnerData = async ({ partnerLicenseId, ...params }: AdminAPI_UpdatePartnerData_Params) => {
  const formData = new FormData();
  for (const objKey in params) {
    const key = objKey as keyof typeof params;
    formData.append(key, params[key] as string | Blob);
  }

  const { data } = await apiClient.patch<AdminAPI_UpdatePartnerData_Response>(`${subURL}/info/partner/${partnerLicenseId}`, formData, { headers: formDataHeader });

  return data;
}
;
const updateWorkerData = async ({ workerEmail, ...params }: AdminAPI_UpdateWorkerData_Params) => {
  const { data } = await apiClient.patch<AdminAPI_UpdateWorkerData_Response>(`${subURL}/info/worker/${workerEmail}`, params);

  return data;
};





export const adminAPI = {
  readPartnerAll,
  readPartner,
  readWorkerInfo,
  readFAQList,
  readPartnerThanksPayAll,
  readPartnerThanksPayList,
  readWorkerThanksPayAll,
  readAffiliationDataAll,
  readPartnerWorkerAll,
  readWorkerDataAll,
  readPartnerInvoiceList,
  readPartnerInvoiceDetail,
  readPartnerDepositList,
  readPartnerDepositDetail,
  readWorkerThanksPayLog,

  sendThanksPayToWorker,
  sendDepositFromPartner,
  setWorkerOverdue,
  createQNAReply,
  sendEmailAuth,
  registerVirtualAccount,

  updateWorkerPasswordFailureCount,
  updateWorkerState,
  updatePartnerData,
  updateWorkerData,
};