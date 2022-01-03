import { Dispatch } from "react";
import { createAction } from "@reduxjs/toolkit";
import { BankListItem, contentAPI, WorkTypeListItem } from "@api";
import { RootState } from "@shared-state";

export const setBankList = createAction<BankListItem[]>('content/setBankList');
export const setWorkTypeList = createAction<WorkTypeListItem[]>('content/setWorkTypeList');

export type SetBankList = ReturnType<typeof setBankList>;
export type SetWorkTypeList = ReturnType<typeof setWorkTypeList>;

export const fetchBankList = () => async (dispatch: Dispatch<SetBankList>, getState: () => RootState) => {
  const { bankList, bankListExpirationTime } = getState().content;
  if (!(!bankList || bankList.length === 0)) {
    if (bankListExpirationTime > new Date().getTime()) return;
  }

  const result = await contentAPI.readBankList();
  if ('errors' in result) return;

  dispatch(setBankList(result.bankList));
};

export const fetchWorkTypeList = () => async (dispatch: Dispatch<SetWorkTypeList>, getState: () => RootState) => {
  const { workTypeList, workTypeListExpirationTime } = getState().content;
  if (!(!workTypeList || workTypeList.length === 0)) {
    if (workTypeListExpirationTime > new Date().getTime()) return;
  }

  const result = await contentAPI.readWorkTypeList();
  if ('errors' in result) return;

  dispatch(setWorkTypeList(result.workTypeList));
};





export const contentFacade = () => async (dispatch: Dispatch<any>) => {
  dispatch(fetchBankList());
  dispatch(fetchWorkTypeList());
};