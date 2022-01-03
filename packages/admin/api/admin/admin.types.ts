import {
  FAQListItem,
  PartnerLicenseId,
  SuccessOrFail,
  BadResponseOr,
  WorkerEmail,
  Year,
  YearMonth,
  AffiliationListItem,
  InvoiceDetailListItem,
  ManagerEmail,
  FileBuffer,
  ThanksPayListItem,
  InvoiceListItem,
  PartnerThanksPayListItem,
  WorkerThanksPayListItem,
  WorkerSummaryListItem,
  WorkerLogListItem,
} from "../APIscheme";

export type AdminAPI_ReadPartnerList_Response = BadResponseOr<{
  partnerList: (PartnerLicenseId & {
    partnerName: string;
  })[];
}>;





export type AdminAPI_ReadPartnerData_Params = PartnerLicenseId;
export type AdminAPI_ReadPartnerData_Response = BadResponseOr<PartnerLicenseId & {
  partnerLicenseFile: FileBuffer;
  klaytnAccount: string;
  partnerCEO: string;
  partnerName: string;
  partnerAddress: string;
  partnerAddressDetails: string;
  partnerSector: string;
  partnerCategory: string;
  partnerType: string;
  salaryDay: number;
  initialDeposit: number;
  initialDepositDate: number;
  isBlock: boolean;
  isBan: boolean;
  partnershipContractFile: FileBuffer;
  performanceBondFile: FileBuffer;
  // depositTypeNow: string;
}>;





export type AdminAPI_ReadWorkerInfo_Params = PartnerLicenseId & WorkerEmail;
export type AdminAPI_ReadWorkerInfo_Response = BadResponseOr<{
  workerPhone: string;
  bankAccountOwner: string;
  bankAccount: string;
  bankName: string;
  bankCode: string;
  workerGender: string;
  workerSalary: number;
  workerSalaryDay: number;
  isBlackWorker: boolean;
  isEmployee: boolean;
  isUsedSimplePassword: boolean;
  myOptionalTerms: {
    termsCode: number;
    termsName: string;
    termsContent: string;
  }[];
}>;





export type AdminAPI_ReadFAQList_Params = {};
export type AdminAPI_ReadFAQList_Response = BadResponseOr<{ FQAList: FAQListItem[]; }>;





export type AdminAPI_readPartnerThanksPayAll_Params = YearMonth;
export type AdminAPI_readPartnerThanksPayAll_Response = BadResponseOr<{
  thanksPayListAllPartner: PartnerThanksPayListItem[];
}>;





export type AdminAPI_ReadWorkerThanksPayAll_Params = WorkerEmail;
export type AdminAPI_ReadWorkerThanksPayAll_Response = BadResponseOr<{
  workerThanksPayListAll: PartnerLicenseId & {
    usingDate: string;
    workerBankCode: string;
    workerBankName: string;
    workerBankAccount: string;
    workerThanksPayDateList: string[];
    workerThanksPayList: string[];
    workerMonthlyThanksPay: number;
    workerMonthlyServiceFeeForMonth: number;
    partnerName: string;
    isBlackWorker: string;
  }[];
}>;





export type AdminAPI_ReadPartnerThanksPayList_Params = PartnerLicenseId & Year;
export type AdminAPI_ReadPartnerThanksPayList_Response = BadResponseOr<{
  partnerThanksPayListByYear: {
    salaryDay: number;
    thanksPayList: ThanksPayListItem[];
  }
}>;





export type AdminAPI_ReadAffiliationDataAll_Params = {};
export type AdminAPI_ReadAffiliationDataAll_Response = BadResponseOr<{
  allPartnershipList: AffiliationListItem[];
}>;





export type AdminAPI_ReadPartnerWorkerAll_Params = PartnerLicenseId;
export type AdminAPI_ReadPartnerWorkerAll_Response = BadResponseOr<{
  workerListByPartner: WorkerSummaryListItem[];
}>;





export type AdminAPI_ReadWorkerDataAll_Params = {};
export type AdminAPI_ReadWorkerDataAll_Response = BadResponseOr<{
  allWorkerList: WorkerThanksPayListItem[];
}>;





export type AdminAPI_ReadPartnerInvoiceList_Params = PartnerLicenseId & Year;
export type AdminAPI_ReadPartnerInvoiceList_Response = BadResponseOr<{
  invoiceList: InvoiceListItem[];
}>;





export type AdminAPI_ReadPartnerInvoiceDetail_Params = PartnerLicenseId & YearMonth;
export type AdminAPI_ReadPartnerInvoiceDetail_Response = BadResponseOr<{
  invoiceListDetail: {
    salaryDay: number;
    partnerMonthlyReqThanksPay: number;
    partnerMonthlyServiceFee: number;
    partnerMonthlyThanksPay: number;
    checkSendEmail: string;
    invoiceListDetailByWorker: InvoiceDetailListItem[];
  },
}>;





export type AdminAPI_ReadPartnerDepositList_Params = PartnerLicenseId & Year;
export type AdminAPI_ReadPartnerDepositList_Response = BadResponseOr<{
  getDepositList: {
    salaryDay: number;
    realtimeDeposit: number;
    realtimeUsedDeposit: number;
    totalRealtimeUsedDeposit: number;
    virtualBankAccount: string;
    virtualAccountBankName: string;
    virtualAccountBankCode: string;
    depositListByYear: {
      yearMonth: string;
      monthlyDepositCount: number;
      partnerIsAutoTransfer: string;
      partnerVirtualAccountBankName: string;
      partnerVirtualAccount: string;
      partnerMonthlyPay: number;
      monthlyDepositBalance: number;
      depositUtilization: number;
      addDeposit: number;
      monthlyDeposit: number;
    }[];
  };
}>;





export type AdminAPI_ReadPartnerDepositDetail_Params = PartnerLicenseId & YearMonth;
export type AdminAPI_ReadPartnerDepositDetail_Response = BadResponseOr<{
  getDepositListByYearMonth: {
    monthlyDepositBalance: number;
    depositUtilization: number;
    monthlyDepositCount: number;
    partnerMonthlyPay: number;
    yearMonth: string;
    addDeposit: number;
    monthlyDeposit: number;
    partnerIsAutoTransfer: number;
    partnerVirtualAccountHolder: string;
    partnerVirtualAccountBankCode: string;
    partnerVirtualAccount: string;
    partnerVirtualAccountBankName: string;
    isAutoTransferFile?: FileBuffer;
    isAutoTransferFileName?: string;
  };
}>;





export type AdminAPI_SendThanksPayToWorker_Params = {
  workerEmail: string;
  advancedPay: number;
  payReqDate: string;
};
export type AdminAPI_SendThanksPayToWorker_Response = BadResponseOr<SuccessOrFail>;





export type AdminAPI_SendDepositFromPartner_Params = PartnerLicenseId & {
  deposit: number;
  virtualBankAccount: string;
  bankCode: string;
  accountHolder: string;
};
export type AdminAPI_SendDepositFromPartner_Response = BadResponseOr<{
  realtimeDeposit: number;
}>;





export type AdminAPI_SetWorkerOverdue_Params = {
  workerEmail: string;
  overdueDate: string;
};
export type AdminAPI_SetWorkerOverdue_Response = BadResponseOr<SuccessOrFail>;





export type AdminAPI_CreateQNAReply_Params = {
  qnaId: number;
  qnaReplyManagerId: string;
  qnaReplyContent: string;
};
export type AdminAPI_CreateQNAReply_Response = BadResponseOr<SuccessOrFail>;





export type AdminAPI_SendEmailAuth_Params = { email: string; };
export type AdminAPI_SendEmailAuth_Response = BadResponseOr<SuccessOrFail>;





export type AdminAPI_RegisterVirtualAccount_Params = PartnerLicenseId & {
  virtualAccountHolder: string;
  virtualBankAccount: string;
  virtualAccountBankCode: string;
  isAutoTransfer: '1' | '0';
  autoTransferFile: File;
};
export type AdminAPI_RegisterVirtualAccount_Response = BadResponseOr<{
  virtualAccountHolder: string;
  virtualBankAccount: string;
  virtualAccountBankCode: string;
  virtualAccountBankName: string;
}>;





export type AdminAPI_UpdateWorkerFailureCount_Params = {
  workerEmail: string;
  failureCount: number;
};
export type AdminAPI_UpdateWorkerFailureCount_Response = BadResponseOr<{
  failureCount: number;
}>;





export type AdminAPI_UpdateWorkerState_Params = WorkerEmail & {
  isBlack: boolean | string;
  state?: '지급 정지' | '퇴사';
};
export type AdminAPI_UpdateWorkerState_Response = BadResponseOr<SuccessOrFail>;





export type AdminAPI_UpdatePartnerData_Params = PartnerLicenseId & ManagerEmail & {
  managerPw?: string;
  managerName?: string;
  managerPhone?: string;
  salaryDay?: number;
  addDeposit?: number;
  partnerLicensdFile?: FileBuffer;
  copyOfBankBookFile?: FileBuffer;
  performanceBondFile?: FileBuffer;
  partnerType?: number;
  partnerName?: number;
  partnerCEO?: string;
  partnerAddress?: string;
  partnerAddressDetails?: string;
  partnerSector?: string;
  partnerCategory?: string;
  bankAccount?: string;
  bankAccountOwner?: string;
  bankCode?: string;
};
export type AdminAPI_UpdatePartnerData_Response = BadResponseOr<PartnerLicenseId & ManagerEmail & {
  partnerLicenseFile: FileBuffer;
  partnerLicenseFileName: string;
  klaytnAccount: string;
  partnerCEO: string;
  partnerName: string;
  partnerPhone: string;
  partnerAddress: string;
  partnerAddressDetails: string;
  partnerSector: string;
  partnerCategory: string;
  partnerType: string;
  salaryDay: number;
  initialDeposit: number;
  initialDepositDate: number;
  isBlock: true;
  isBan: true;
  partnershipContractFile: FileBuffer;
  partnershipContractFileName: string;
  performanceBondFile: FileBuffer;
  performanceBondFileName: FileBuffer;
  depositType: string;
  isApproved: true;
  signUpDate: string;
  performanceBondFee: number;
  copyOfBankBookFile: FileBuffer;
  copyOfBankBookFileName: FileBuffer;
  bankAccount: string;
  bankAccountOwner: string;
  bankName: string;
  bankCode: number;
  managerName: string;
  managerPhone: string;
  realtimeDeposit: number;
  virtualBankAccount: string;
  virtualAccountBankCode: string;
  virtualAccountBankName: string;
}>;





export type AdminAPI_UpdateWorkerData_Params = WorkerEmail & {
  workerName: string;
  klaytnAccount: string;
  workerBirth: string;
  workerPhone: string;
  partnerLicenseId: string;
  workType: number;
  workerSalaryDay: number;
  workerSalary: number;
  isCashReceipt: boolean;
};
export type AdminAPI_UpdateWorkerData_Response = BadResponseOr<WorkerEmail & {
  workerName: string;
  workerBirth: string;
  workerPhone: string;
  workerSalary: number;
  workType: number;
  partnerLicenseId: string;
  partnerName: string;
  salaryDay: string;
  bankAccount: string;
  bankAccountOwner: string;
  bankCode: string;
}>;





export type AdminAPI_ReadWorkerThanksPayLog_Params = WorkerEmail;
export type AdminAPI_ReadWorkerThanksPayLog_Response = BadResponseOr<{
  workerThanksPayListAll: WorkerLogListItem[];
}>;





export type AdminAPI_TEMPLATE_Params = {};
export type AdminAPI_TEMPLATE_Response = BadResponseOr<{}>;