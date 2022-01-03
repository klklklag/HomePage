import {
  BadResponseOr,
  ContentTargetType,
  FAQListItem,
  SuccessOrFail,
} from "../../APIscheme";

export type ContentAPI_ReadFAQList_Params = ContentTargetType;
export type ContentAPI_ReadFAQList_Response = BadResponseOr<{
  FAQList: FAQListItem[];
}>;

export type ContentAPI_CreateFAQItem_Params = Omit<FAQListItem, 'faqId'>;
export type ContentAPI_CreateFAQItem_Response = BadResponseOr<SuccessOrFail>;

export type ContentAPI_UpdateFAQItem_Params = Partial<FAQListItem> & Pick<FAQListItem, 'faqId'>;
export type ContentAPI_UpdateFAQItem_Response = BadResponseOr<FAQListItem & { faqCategory: string; }>;

export type ContentAPI_DeleteFAQItem_Params = Pick<FAQListItem, 'faqId'>;
export type ContentAPI_DeleteFAQItem_Response = BadResponseOr<SuccessOrFail>;