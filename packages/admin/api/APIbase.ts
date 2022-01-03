import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { FormData } from 'formdata-node';
import { devLog, executeIfDev } from "@resources";
import { networkErrorResponse } from "./APIscheme";

export const formDataHeader = { 'Content-Type': 'multipart/form-data' };

const logResponseData = ({ data, params, method, url }: AxiosRequestConfig) => {
  if (data instanceof FormData) {
    const formData = data;
    let log = {};
    for (const [key, value] of formData.entries()) {
      log = Object.assign(log, { [key]: value });
      // if (regex.test(value)) {
      //   log = Object.assign(log, { [key]: JSON.parse(value) });
      // }
      // else {
      //   log = Object.assign(log, { [key]: value });
      // }
    };
    console.log('[리퀘스트 로그]', `${method} ${url}`, log);
  }
  else {
    console.log('[리퀘스트 로그]', `${method} ${url}`, data || params);
  }
};





const _apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  timeout: 10000,
  // withCredentials: true,
});

// _apiClient를 이용해 리퀘스트를 보낼 때,
// 콜과 엔드포인트 (서버) 사이에 끼어들어 (intercept) 설정을 건드리는 코드.
_apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    executeIfDev(() => logResponseData(config));
    
    return {
      ...config,
      validateStatus: (status: number) => (status >= 200 && status < 300) || status === 400,
    };
  },
  (error) => Promise.reject(error),
);

// _apiClient를 이용한 리퀘스트에 대한 응답을 받을 때,
// send와 엔드포인트 (디바이스) 사이에 끼어들어 (intercept) Promise를 건드리는 코드.
_apiClient.interceptors.response.use(
  (response) => {
    devLog('[리스폰스 로그]', response.data);
    return response;
  },
  (error: AxiosError) => {
    const { response, request } = error;

    if (response) {
      const { status, request } = response;
      devLog('[에러 리스폰스]', `${status}\n${request?._method} ${request?.responseURL}`);
    }
    else if (request) {
      devLog('[에러 리퀘스트]', request);
    }
    else {
      devLog('[에러 리스폰스]', error);
    }

    return { data: networkErrorResponse };
  },
);

export const apiClient = _apiClient;