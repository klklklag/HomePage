import {
  ManagerEmail,
  PartnerData,
  PartnerLicenseId,
  SuccessOrFail,
  BadResponseOr,
  FileBuffer,
} from '../APIscheme';





export type PartnerAPI_ReadPartnerAll_Params = null;
export type PartnerAPI_ReadPartnerAll_Response = BadResponseOr<{
  partnerList: PartnerLicenseId & {
    partnerName: string;
  }[];
}>;





export type PartnerAPI_ReadPartnerData_Params = PartnerLicenseId;
export type PartnerAPI_ReadPartnerData_Response = BadResponseOr<PartnerData>;





export type PartnerAPI_ReadPartnerManagerData_Params = PartnerLicenseId;
export type PartnerAPI_ReadPartnerManagerData_Response = BadResponseOr<ManagerEmail & {
  managerName: string;
  managerPhone: string;
  signUpDate: string;
  isEmailAuth: boolean;
  authDate: string;
  partnerLicenseId: string;
}>;





export type PartnerAPI_ReadPartnerWorkersAll_Params = PartnerLicenseId;
export type PartnerAPI_ReadPartnerWorkersAll_Response = BadResponseOr<{
  workerList: ManagerEmail & {
    klaytnAccount: string;
    workerName: string;
    workType: string;
    workerSalary: number;
    workerSalaryDay: number;
  }[];
}>;





export type PartnerAPI_ReadPartnerState_Params = PartnerLicenseId;
export type PartnerAPI_ReadPartnerState_Response = BadResponseOr<{
  businessState: string;
}>;





export type PartnerAPI_Signup_Params = {
  partnerManagerInfo: ManagerEmail & {
    managerPw: string;
    managerName: string;
    managerPhone: string;
    salaryDay: number;
    initialDeposit: number;
  };
  partnerOptionalTermsInfo: ManagerEmail & {
    termsCodeList: number[];
  };
};
export type PartnerAPI_Signup_Response = BadResponseOr<ManagerEmail>;





export type PartnerAPI_Partnership_Params = {
  partnerInfo: ManagerEmail & PartnerLicenseId & {
    partnerLicenseFile: File;
    klaytnAccount: string;
    depositType: number;
    partnerCEO: string;
    partnerName: string;
    partnerAddress: string;
    partnerAddressDetails: string;
    partnerSector: string;
    partnerCategory: string;
    partnerType: number;
    partnerPhone: string;
  };
  partnerBankInfo: {
    bankAccount: string;
    bankAccountOwner: string;
    bankCode: string;
    copyOfBankBookFile: File;
  }
};
export type PartnerAPI_Partnership_Response = BadResponseOr<{
  blockNumber: number;
}>;





export type PartnerAPI_Login_Params = ManagerEmail & {
  managerPw: string;
};
export type PartnerAPI_Login_Response = BadResponseOr<ManagerEmail & PartnerLicenseId & {
  isEmailAuth: number;
}>;





export type PartnerAPI_UpdatePartnerData_Params = PartnerLicenseId & {
  partnerLicenseFile?: File;
  klaytnAccount?: string;
  partnerCEO?: string;
  partnerName?: string;
  partnerAddress?: string;
  partnerAddressDetails: string;
  partnerSector?: string;
  partnerCategory?: string;
  partnerType?: number;
  salaryDay?: number;
  initialDeposit?: number;
  initialDepositDate?: number;
  isBlock?: boolean;
  isBan?: boolean;
  partnershipContractFile?: File;
  performanceBondFile?: File;
  depositType?: number;
};
export type PartnerAPI_UpdatePartnerData_Response = BadResponseOr<SuccessOrFail>;





export type PartnerAPI_UpdatePartnerManagerData_Params = PartnerLicenseId & {
  managerEmail?: string;
  managerPw?: string;
  managerName?: string;
  managerPhone?: string;
  managerPosition?: string;
};
export type PartnerAPI_UpdatePartnerManagerData_Response = BadResponseOr<SuccessOrFail>;





export type PartnerAPI_UpdatePartnerBankData_Params = PartnerLicenseId & {
  bankAccount: string;
  bankAccountOwner: string;
  bankCode: string;
};
export type PartnerAPI_UpdatePartnerBankData_Response = BadResponseOr<SuccessOrFail>;





export type PartnerAPI_TEMPLATE_Params = {};
export type PartnerAPI_TEMPLATE_Response = BadResponseOr<{}>;