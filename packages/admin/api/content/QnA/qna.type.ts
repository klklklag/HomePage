import {
  BadResponseOr,
  ContentTargetType,
  QnAListItem,
  SuccessOrFail,
} from "../../APIscheme";


// {
//   qnaId: number,
//   qnaCategory: number,
//   qnaTitle: string,
//   qnaContent: string,
//   isSecret: boolean,
//   qnaSecret: string,
//   qnaDatetime: string,
//   qnaReplyContent: string,
//   qnaReplyDatetime: string,
//   qnaReplyId: string,
//   userEmail: string
// }

export type ContentAPI_ReadQnAList_Params = ContentTargetType;
export type ContentAPI_ReadQnAList_Response = BadResponseOr<{
  QnAList: QnAListItem[];
}>;

export type ContentAPI_ReadQnAItem_Params = Pick<QnAListItem, 'qnaId'>;
export type ContentAPI_ReadQnAItem_Response = BadResponseOr<QnAListItem>;

export type ContentAPI_CreateQnAItem_Params = Pick<QnAListItem, 'qnaCategory' | 'qnaTitle' | 'qnaContent' | 'isSecret' | 'userEmail'>;
export type ContentAPI_CreateQnAItem_Response = BadResponseOr<QnAListItem>;

export type ContentAPI_UpdateQnAItem_Params = Partial<Pick<QnAListItem, 'qnaCategory' | 'qnaTitle' | 'qnaContent' | 'isSecret' | 'qnaSecret'>> & Pick<QnAListItem, 'qnaId' | 'userEmail'>;
export type ContentAPI_UpdateQnAItem_Response = BadResponseOr<QnAListItem>;

export type ContentAPI_DeleteQnAItem_Params = Pick<QnAListItem, 'qnaId'>;
export type ContentAPI_DeleteQnAItem_Response = BadResponseOr<SuccessOrFail>;