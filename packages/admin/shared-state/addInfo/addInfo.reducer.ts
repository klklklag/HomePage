import { createReducer } from "@reduxjs/toolkit";
import { PartnerAPI_Partnership_Params } from "@api";
import {
  addAdditionalData,
  clearAdditionalData,

  setPartnershipRequestSuccessFlag,
  clearPartnershipRequestSuccessFlag,
} from './addInfo.action';

type AddInfoState = 
  & PartnerAPI_Partnership_Params['partnerInfo']
  & PartnerAPI_Partnership_Params['partnerBankInfo']
  & { successFlag: boolean; };
const INITIAL_STATE: AddInfoState = {
  successFlag: false,
} as AddInfoState;

export const addInfoReducer = createReducer(INITIAL_STATE, builder => 
  builder
  .addCase(addAdditionalData, (state, { payload }) =>
    ({
      ...state,
      ...payload,
    })
  )
  .addCase(clearAdditionalData, () => INITIAL_STATE)
  .addCase(setPartnershipRequestSuccessFlag, (state) => 
    ({
      ...state,
      successFlag: true,
    })
  )
  .addCase(clearPartnershipRequestSuccessFlag, (state) => 
    ({
      ...state,
      successFlag: false,
    })
  )
);