import { apiClient } from '../../APIbase';
import {
  ContentAPI_CreateTermItem_Params,
  ContentAPI_CreateTermItem_Response,
  ContentAPI_DeleteTermItem_Params,
  ContentAPI_DeleteTermItem_Response,
  ContentAPI_ReadTermItem_Params,
  ContentAPI_ReadTermItem_Response,
  ContentAPI_ReadTermList_Params,
  ContentAPI_ReadTermList_Response,
  ContentAPI_UpdateTermItem_Params,
  ContentAPI_UpdateTermItem_Response,
} from './term.type';

const readTermList = async ({ targetType, ...params }: ContentAPI_ReadTermList_Params) => {
  const { data } = await apiClient.get<ContentAPI_ReadTermList_Response>(`/contents/list/terms/${targetType}`, { params });

  return data;
};

const readTermItem = async ({ termsCode }: ContentAPI_ReadTermItem_Params) => {
  const { data } = await apiClient.get<ContentAPI_ReadTermItem_Response>(`/contents/terms/${termsCode}`);

  return data;
};

const createTermItem = async (params: ContentAPI_CreateTermItem_Params) => {
  const { data } = await apiClient.post<ContentAPI_CreateTermItem_Response>(`/admin/terms`, params);

  return data;
};

const updateTermItem = async ({ termsCode, ...params }: ContentAPI_UpdateTermItem_Params) => {
  const { data } = await apiClient.patch<ContentAPI_UpdateTermItem_Response>(`/admin/terms/${termsCode}`, params);

  return data;
};

const deleteTermItem = async ({ termsCode }: ContentAPI_DeleteTermItem_Params) => {
  const { data } = await apiClient.delete<ContentAPI_DeleteTermItem_Response>(`/admin/terms/${termsCode}`);

  return data;
};

export default {
  createTermItem,
  readTermList,
  readTermItem,
  updateTermItem,
  deleteTermItem,
}