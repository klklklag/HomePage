import { apiClient } from '../../APIbase';
import {
  ContentAPI_CreateFAQItem_Params,
  ContentAPI_CreateFAQItem_Response,
  ContentAPI_DeleteFAQItem_Params,
  ContentAPI_DeleteFAQItem_Response,
  ContentAPI_ReadFAQList_Params,
  ContentAPI_ReadFAQList_Response,
  ContentAPI_UpdateFAQItem_Params,
  ContentAPI_UpdateFAQItem_Response,
} from './faq.type';

const readFAQList = async ({ targetType }: ContentAPI_ReadFAQList_Params) => {
  const { data } = await apiClient.get<ContentAPI_ReadFAQList_Response>(`/contents/list/faq/${targetType}`);

  return data;
};

const createFAQItem = async (params: ContentAPI_CreateFAQItem_Params) => {
  const { data } = await apiClient.post<ContentAPI_CreateFAQItem_Response>('/admin/faq', params);

  return data;
};

const updateFAQItem = async ({ faqId, ...params }: ContentAPI_UpdateFAQItem_Params) => {
  const { data } = await apiClient.patch<ContentAPI_UpdateFAQItem_Response>(`/admin/faq/${faqId}`, params);

  return data;
};

const deleteFAQItem = async ({ faqId }: ContentAPI_DeleteFAQItem_Params) => {
  const { data } = await apiClient.delete<ContentAPI_DeleteFAQItem_Response>(`/admin/faq/${faqId}`);

  return data;
};

export default {
  readFAQList,
  createFAQItem,
  updateFAQItem,
  deleteFAQItem,
}