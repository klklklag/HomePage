import { createReducer } from "@reduxjs/toolkit";
import { FileBuffer, PartnerData } from "@api";
import {
  setPartnerData,
  clearPartnerData,
} from './partner.action';

const INITIAL_STATE = {
  partnerLicenseId: '',
  partnerLicenseFile: {} as FileBuffer,
  klaytnAccount: '',
  partnerCEO: '',
  partnerName: '',
  partnerAddress: '',
  partnerAddressDetails: '',
  partnerSector: '',
  partnerCategory: '',
  partnerType: '',
  salaryDay: 0,
  initialDeposit: 0,
  initialDepositDate: 0,
  isBlock: false,
  isBan: false,
  partnershipContractFile: {} as FileBuffer,
  performanceBondFile: {} as FileBuffer,
  // depositTypeNow: '',
} as PartnerData;

export const partnerReducer = createReducer(INITIAL_STATE, builder => 
  builder
  .addCase(clearPartnerData, () => INITIAL_STATE)
  .addCase(setPartnerData, (state, { payload }) => payload)
);