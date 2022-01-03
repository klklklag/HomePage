import { Dispatch } from "react";
import { createAction } from "@reduxjs/toolkit";
import { RootState } from "@shared-state";
import { partnerAPI } from "@api";

export const addAdditionalData = createAction<object>('addInfo/addAdditionalData');
export const clearAdditionalData = createAction('addInfo/clearAdditionalData');
export const setPartnershipRequestSuccessFlag = createAction('addInfo/setPartnershipRequestSuccessFlag');
export const clearPartnershipRequestSuccessFlag = createAction('addInfo/clearPartnershipRequestSuccessFlag');

export type AddAdditionalData = ReturnType<typeof addAdditionalData>;
export type ClearAdditionalData = ReturnType<typeof clearAdditionalData>;
export type SetPartnershipRequestSuccessFlag = ReturnType<typeof setPartnershipRequestSuccessFlag>;
export type ClearPartnershipRequestSuccessFlag = ReturnType<typeof clearPartnershipRequestSuccessFlag>;

export const sendPartnershipRequest = () => async (dispatch: Dispatch<ClearAdditionalData | SetPartnershipRequestSuccessFlag | ClearPartnershipRequestSuccessFlag>, getState: () => RootState) => {
  const data = getState().addInfo;
  const params = {
    partnerInfo: {
      partnerLicenseId: data.partnerLicenseId.replace(/-/g, ''),
      managerEmail: data.managerEmail,
      partnerLicenseFile: data.partnerLicenseFile,
      klaytnAccount: process.env.NEXT_PUBLIC_KLAYTN_ACCOUNT as string,
      depositType: 1,
      partnerCEO: data.partnerCEO,
      partnerName: data.partnerName,
      partnerAddress: data.partnerAddress,
      partnerAddressDetails: data.partnerAddressDetails,
      partnerSector: data.partnerSector,
      partnerCategory: data.partnerCategory,
      partnerType: data.partnerType,
      partnerPhone: data.partnerPhone,
    },
    partnerBankInfo: {
      bankAccount: data.bankAccount,
      bankAccountOwner: data.bankAccountOwner,
      bankCode: data.bankCode,
      copyOfBankBookFile: data.copyOfBankBookFile,
    },
  }

  const result = await partnerAPI.partnership(params);
  if ('errors' in result) return;

  dispatch(clearAdditionalData());
  dispatch(setPartnershipRequestSuccessFlag());
  setTimeout(() => dispatch(clearPartnershipRequestSuccessFlag()), 300);
  return;
}