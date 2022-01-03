import { apiClient, formDataHeader } from "api/APIbase";
import {
  // PartnerAPI_ReadPartnerAll_Params,
  PartnerAPI_ReadPartnerAll_Response,
  PartnerAPI_ReadPartnerData_Params,
  PartnerAPI_ReadPartnerData_Response,
  PartnerAPI_ReadPartnerManagerData_Params,
  PartnerAPI_ReadPartnerManagerData_Response,
  PartnerAPI_ReadPartnerWorkersAll_Params,
  PartnerAPI_ReadPartnerWorkersAll_Response,
  PartnerAPI_ReadPartnerState_Params,
  PartnerAPI_ReadPartnerState_Response,
  PartnerAPI_Signup_Params,
  PartnerAPI_Signup_Response,
  PartnerAPI_Partnership_Params,
  PartnerAPI_Partnership_Response,
  PartnerAPI_Login_Params,
  PartnerAPI_Login_Response,
  PartnerAPI_UpdatePartnerData_Params,
  PartnerAPI_UpdatePartnerData_Response,
  PartnerAPI_UpdatePartnerManagerData_Params,
  PartnerAPI_UpdatePartnerManagerData_Response,
  PartnerAPI_UpdatePartnerBankData_Params,
  PartnerAPI_UpdatePartnerBankData_Response,
} from "./partner.types";

const subURL = '/partner';





const readPartnerAll = async () => {
  const { data } = await apiClient.get<PartnerAPI_ReadPartnerAll_Response>(subURL + '/all');

  return data;
};

const readPartnerData = async ({ partnerLicenseId }: PartnerAPI_ReadPartnerData_Params) => {
  const { data } = await apiClient.get<PartnerAPI_ReadPartnerData_Response>(subURL + '/info/' + partnerLicenseId);

  return data;
};

const readPartnerManagerData = async ({ partnerLicenseId }: PartnerAPI_ReadPartnerManagerData_Params) => {
  const { data } = await apiClient.get<PartnerAPI_ReadPartnerManagerData_Response>(subURL + '/info/manager/' + partnerLicenseId);

  return data;
};

const readPartnerWorkersAll = async ({ partnerLicenseId }: PartnerAPI_ReadPartnerWorkersAll_Params) => {
  const { data } = await apiClient.get<PartnerAPI_ReadPartnerWorkersAll_Response>(subURL + '/info/worker/' + partnerLicenseId);

  return data;
};

const readPartnerState = async ({ partnerLicenseId }: PartnerAPI_ReadPartnerState_Params) => {
  const { data } = await apiClient.get<PartnerAPI_ReadPartnerState_Response>(subURL + '/state/' + partnerLicenseId);

  return data;
};





const signup = async (params: PartnerAPI_Signup_Params) => {
  const { data } = await apiClient.post<PartnerAPI_Signup_Response>(subURL + '/signup', params);

  return data;
};

const partnership = async (params: PartnerAPI_Partnership_Params) => {
  const {
    partnerInfo: {
      partnerLicenseFile,
      ...partnerInfo
    },
    partnerBankInfo: {
      copyOfBankBookFile,
      ...partnerBankInfo
    },
  } = params;
  const formData = new FormData();
  formData.append('partnerLicenseFile', partnerLicenseFile);
  formData.append('partnerInfo', JSON.stringify(partnerInfo));
  formData.append('copyOfBankBookFile', copyOfBankBookFile);
  formData.append('partnerBankInfo', JSON.stringify(partnerBankInfo));

  const { data } = await apiClient.post<PartnerAPI_Partnership_Response>(subURL + '/partnership', formData, { headers: formDataHeader });

  return data;
};

const login = async (params: PartnerAPI_Login_Params) => {
  const { data } = await apiClient.post<PartnerAPI_Login_Response>(subURL + '/login', params);

  return data;
};





const updatePartnerData = async (params: PartnerAPI_UpdatePartnerData_Params) => {
  const { data } = await apiClient.patch<PartnerAPI_UpdatePartnerData_Response>(subURL + '/info', params);

  return data;
};

const updatePartnerManagerData = async (params: PartnerAPI_UpdatePartnerManagerData_Params) => {
  const { data } = await apiClient.patch<PartnerAPI_UpdatePartnerManagerData_Response>(subURL + '/info/manager', params);

  return data;
};

const updatePartnerBankData = async (params: PartnerAPI_UpdatePartnerBankData_Params) => {
  const { data } = await apiClient.patch<PartnerAPI_UpdatePartnerBankData_Response>(subURL + '/info/bank', params);

  return data;
};







export const partnerAPI = {
  readPartnerAll,
  readPartnerData,
  readPartnerManagerData,
  readPartnerWorkersAll,
  readPartnerState,

  signup,
  partnership,
  login,

  updatePartnerData,
  updatePartnerManagerData,
  updatePartnerBankData,
};