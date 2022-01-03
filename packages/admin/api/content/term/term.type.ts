import {
  BadResponseOr,
  ContentTargetType,
  Id,
  SuccessOrFail,
  TermListItem,
  TermType,
} from '../../APIscheme';

export type ContentAPI_ReadTermList_Params = ContentTargetType & TermType;
export type ContentAPI_ReadTermList_Response = BadResponseOr<{
  requiredTerms?: TermListItem[];
  optionalTerms?: TermListItem[];
  withdrawConsent?: {
    title: string;
    content: string;
  };
}>;

export type ContentAPI_ReadTermItem_Params = Pick<TermListItem, 'termsCode'>;
export type ContentAPI_ReadTermItem_Response = BadResponseOr<TermListItem>;

export type ContentAPI_CreateTermItem_Params = Pick<TermListItem, 'termsName' | 'termsContent' | 'required' | 'termsFlag' | 'isUsed' | 'registerId'>;
export type ContentAPI_CreateTermItem_Response = BadResponseOr<TermListItem>;

export type ContentAPI_UpdateTermItem_Params = Partial<Omit<TermListItem, 'termsCode' | 'registerId' | 'registerDate' | 'applyDate' | 'modiDate'>> & Pick<TermListItem, 'termsCode'>;
export type ContentAPI_UpdateTermItem_Response = BadResponseOr<TermListItem>;

export type ContentAPI_DeleteTermItem_Params = Pick<TermListItem, 'termsCode'>;
export type ContentAPI_DeleteTermItem_Response = BadResponseOr<SuccessOrFail>;