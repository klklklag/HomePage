import { apiClient } from '../../APIbase';
import {
  ContentAPI_CreateQnAItem_Params,
  ContentAPI_CreateQnAItem_Response,
  ContentAPI_DeleteQnAItem_Params,
  ContentAPI_DeleteQnAItem_Response,
  ContentAPI_ReadQnAItem_Params,
  ContentAPI_ReadQnAItem_Response,
  ContentAPI_ReadQnAList_Params,
  ContentAPI_ReadQnAList_Response,
  ContentAPI_UpdateQnAItem_Params,
  ContentAPI_UpdateQnAItem_Response,
} from './qna.type';

const readQnAList = async ({ targetType }: ContentAPI_ReadQnAList_Params) => {
  const { data } = await apiClient.get<ContentAPI_ReadQnAList_Response>(`/contents/list/question/${targetType}`);

  return data;
};

const readQnAItem = async ({ qnaId }: ContentAPI_ReadQnAItem_Params) => {
  const { data } = await apiClient.get<ContentAPI_ReadQnAItem_Response>(`/contents/question/${qnaId}`);

  return data;
};

const createQnAItem = async (params: ContentAPI_CreateQnAItem_Params) => {
  const { data } = await apiClient.post<ContentAPI_CreateQnAItem_Response>(`/contents/question`, params);

  return data;
};

const updateQnAItem = async ({ qnaId, ...params }: ContentAPI_UpdateQnAItem_Params) => {
  const { data } = await apiClient.patch<ContentAPI_UpdateQnAItem_Response>(`/contents/question/${qnaId}`, params);

  return data;
};

const deleteQnAItem = async ({ qnaId }: ContentAPI_DeleteQnAItem_Params) => {
  const { data } = await apiClient.delete<ContentAPI_DeleteQnAItem_Response>(`/contents/question/${qnaId}`);

  return data;
};

export default {
  createQnAItem,
  readQnAList,
  readQnAItem,
  updateQnAItem,
  deleteQnAItem,
}