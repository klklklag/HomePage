import { createReducer } from "@reduxjs/toolkit";
import { BankListItem, WorkTypeListItem } from "@api";
import { setBankList, setWorkTypeList } from "./content.action";

const INITIAL_STATE: {
  bankList: BankListItem[];
  bankListExpirationTime: number;
  workTypeList: WorkTypeListItem[];
  workTypeListExpirationTime: number;
} = {
  bankList: [],
  bankListExpirationTime: 0,
  workTypeList: [],
  workTypeListExpirationTime: 0,
};

const HOUR_IN_MS = 3600 * 1000;

export const contentReducer = createReducer(INITIAL_STATE, builder => 
  builder
  .addCase(setBankList, (state, { payload }) =>
    ({
      ...state,
      bankList: payload,
      bankListExpirationTime: (new Date().getTime()) + (6 * HOUR_IN_MS),
    })
  )
  .addCase(setWorkTypeList, (state, { payload }) =>
    ({
      ...state,
      workTypeList: payload,
      workTypeListExpirationTime: (new Date().getTime()) + (6 * HOUR_IN_MS),
    })
  )
);