import {
  BankListItem,
  BadResponseOr,
  WorkTypeListItem,
} from '../APIscheme';







export type ContentAPI_ReadBankList_Response = BadResponseOr<{
  bankList: BankListItem[];
}>;

export type ContentAPI_ReadWorkTypeList_Response = BadResponseOr<{
  workTypeList: WorkTypeListItem[];
}>;

export type ContentAPI_TEMPLATE_Params = {};
export type ContentAPI_TEMPLATE_Response = BadResponseOr<{}>;