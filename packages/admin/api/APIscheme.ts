export type PartnerLicenseId = { partnerLicenseId: string };
export type ManagerEmail = { managerEmail: string };
export type WorkerEmail = { workerEmail: string };
export type SuccessOrFail = { success: boolean };
export type Year = { year: string; };
export type YearMonth = { yearMonth: string; };
export type ContentTargetType = { targetType: 'worker' | 'partner' };
export enum ContentTargetTypeFlag {
  partner = 1,
  worker,
};
export type Id = { id: number };
export type FileBuffer = {
  type: 'Buffer',
  name: string;
  data: any[];
};
export type FAQListItem = {
  faqId: number;
  faqTitle: string;
  // faqContent: string;
  faqReply: string;
  faqCategory: ContentTargetTypeFlag;
};
export type BankListItem = {
  bankCode: string;
  bankName: string;
};
export type WorkTypeListItem = {
  workType: number;
  workTypeName: string;
};
export type PartnerData = PartnerLicenseId & {
  partnerLicenseFile: FileBuffer;
  klaytnAccount: string;
  partnerCEO: string;
  partnerName: string;
  partnerAddress: string;
  partnerAddressDetails: string;
  partnerSector: string;
  partnerCategory: string;
  partnerType: string;
  partnerBankName: string;
  salaryDay: number;
  initialDeposit: number;
  initialDepositDate: number;
  isBlock: boolean;
  isBan: boolean;
  partnershipContractFile: FileBuffer;
  performanceBondFile: FileBuffer;
  depositType: string;
  partnerPhone: string;
  isApproved: boolean;
  managerEmail: string;
  signUpDate: string;
  performanceBondFee: number;
  copyOfBankBookFile: FileBuffer;
  bankAccount: string;
  bankAccountOwner: string;
  bankName: string;
  bankCode: number;
  managerName: string;
  managerPhone: string;
  realtimeDeposit: string;
};
export type WorkerSummaryListItem = WorkerEmail & {
  workerName: string;
  workerBirth: string;
  workerPhone: string;
  workType: string;
  isEmployee: string;
  workerBankName: string;
  workerBankAccount: string;
  workerIsAgreeMarketing: string;
  isBlackWorker: string;
};
export type WorkerData = {
  _isBlackWorker: any;
  workerPhone: string;
  bankAccountOwner: string;
  bankAccount: string;
  bankName: string;
  bankCode: string;
  workerBirth: number;
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
};
export type AffiliationListItem = (PartnerLicenseId & {
  id?: number;
  partnerName: string;
  partnerType: string;
  partnerSignUpDate: string;
  managerName: string;
  managerPhone: string;
  isPerformanceBondContract: string;
  performanceBondFee: number;
  firstTransferDepositDate: string;
  deposit: number;
  isTransferDeposit: string;
  isApproved: string;
});
export type WorkerPartnerData = {
  partnerName: string;
  workType: string;
  workerSalary: number;
  partnerSalaryDay: number;
};
export type InvoiceDetailListItem = {
  workerName: string;
  workerBirth: string;
  workerPhone: string;
  thanksPayCountByWorker: number;
  workerThanksPayDateList: string[];
  workerThanksPayList: string[];
  workerMonthlyThanksPay: number;
  workerMonthlyServiceFee: number;
  workerMonthlyPay: number;
};
export type ThanksPayListItem = {
  yearMonth: string;
  partnerState: string;
  salaryDay: string;
  partnerClosingDay: string;
  workerCount: number;
  thanksPayCountByPartner: number;
  partnerMonthlyThanksPay: number;
  partnerMonthlyServiceFee: number;
  partnerMonthlyPay: number;
  monthlyDepositBalance: number;
};
export type InvoiceListItem = YearMonth & {
  checkSendEmail: string;
  sendEmailDate: string;
  managerName_invoice: string;
  managerEmail: string;
  workerCount: number;
  partnerMonthlyThanksPay: number;
  partnerMonthlyServiceFee: number;
  partnerMonthlyPay: number;
};
export type PartnerThanksPayListItem = PartnerLicenseId & {
  partnerName: string;
  partnerState: string;
  partnerClosingDayAndReturningDay: string;
  salaryDay: string;
  workerCount: number;
  thanksPayCountByPartner: number;
  partnerMonthlyThanksPay: number;
  partnerMonthlyServiceFee: number;
  partnerMonthlyPay: number;
  monthlyDepositBalance: number;
};
export type WorkerThanksPayListItem = WorkerEmail & {
  workerSignUpDate: string;
  workerName: string;
  workerBirth: string;
  workerGender: string;
  workerIsAgreeMarketing: string;
  workerMonthlyThanksPayForMonth: number;
  workerMonthlyServiceFeeForMonth: number;
  allThanksPayCountByWorker: string;
  workerTotalThanksPay: number;
  workerTotalServiceFee: number;
  expectedSalary: number;
  workersPartnerName: string;
  isBlackWorker: string;
};
export type TermType = { type: 'all' | 'required' | 'optional' };
export type TermListItem = {
  termsCode: number;
  termsName: string;
  termsContent: string;
  termsFlag: number;
  registerId: string;
  registerDate: string;
  required: number;
  applyDate: string;
  isUsed: boolean;
  modiDate: string;
  modiId: string;
};
export type QnAListItem = {
  qnaId: number,
  qnaCategory: ContentTargetTypeFlag,
  qnaTitle: string,
  qnaContent: string,
  isSecret: boolean,
  qnaSecret: string,
  qnaDatetime: string,
  qnaReplyContent: string,
  qnaReplyDatetime: string,
  qnaReplyId: string,
  userEmail: string
};
export type WorkerLogListItem = {
  usingDate: string;
  workerBankCode: string;
  workerBankName: string;
  workerBankAccount: string;
  workerThanksPayDateList: string[];
  workerThanksPayList: string[];
  workerMonthlyThanksPay: number;
  workerMonthlyServiceFeeForMonth: number;
  partnerLicenseId: string;
  partnerName: string;
  isBlackWorker: string;
};
export type AccessLevel = {
  auth: 'admin' | 'partner';
};

export type WithCredential<T> = AccessLevel & T


// 400 응답과 함께 내려 줄 에러 객체
export type BadResponse = {
  errors: {
    errCode: string;
    errName: string;
    errMsg: string;
  }
};

export const networkErrorResponse: BadResponse = {
  errors: {
    errCode: 'Network Error',
    errName: 'Network Error',
    errMsg: '서버에 에러가 발생했습니다.\n잠시 후 다시 시도해 주세요.',
  }
};

export type BadResponseOr<T> = WithCredential<T> | BadResponse;