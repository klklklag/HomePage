import { Dispatch } from "react";
import { createAction } from "@reduxjs/toolkit";
import { RootState } from "@shared-state";
import { partnerAPI, PartnerData, PartnerLicenseId } from "@api";

export const clearPartnerData = createAction('partner/clearPartnerData');
export const setPartnerData = createAction<PartnerData>('partner/setPartnerData');





export type ClearPartnerData = ReturnType<typeof clearPartnerData>;
export type SetPartnerData = ReturnType<typeof setPartnerData>;





export const fetchPartnerData = ({ partnerLicenseId }: PartnerLicenseId) => async (dispatch: Dispatch<any>, getState: () => RootState) => {
  const currentLicenseId = getState().partner.partnerLicenseId;
  if (currentLicenseId === partnerLicenseId) return ;

  const result = await partnerAPI.readPartnerData({ partnerLicenseId });
  if ('errors' in result) {
    alert(result.errors.errMsg);
    return;
  }

  dispatch(setPartnerData(result));
};