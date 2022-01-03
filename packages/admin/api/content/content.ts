import { apiClient } from "../APIbase";
import {
  ContentAPI_ReadBankList_Response,
  ContentAPI_ReadWorkTypeList_Response,
} from "./content.types";
import faqAPI from './FAQ/faq';
import qnaAPI from './QnA/qna';
import termAPI from './term/term';

const subURL = '/contents';





const readBankList = async () => {
  const { data } = await apiClient.get<ContentAPI_ReadBankList_Response>(subURL + '/list/bank');

  return data;
};

const readWorkTypeList = async () => {
  const { data } = await apiClient.get<ContentAPI_ReadWorkTypeList_Response>(subURL + '/list/type');

  return data;
};





export const contentAPI = {
  readBankList,
  readWorkTypeList,

  ...faqAPI,
  ...qnaAPI,
  ...termAPI,
};