import { AxiosRequestConfig } from 'axios';

export interface RequestOptions {
  apiUrl?: string;
  isJoinPrefix?: boolean;
  urlPrefix?: string;
  joinParamsToUrl?: boolean;
  formatDate?: boolean;
  isTransformResponse?: boolean;
  isReturnNativeResponse?: boolean;
  ignoreRepeatRequest?: boolean;
  joinTime?: boolean;
  withToken?: boolean;
  retry?: {
    count: number;
    delay?: number;
  };
  errorWarning?: boolean
}

export interface ErrorResult {
  errorCode: number | null
  errorMessage: string | null
  reason: string | null
}

export type Result<T = any> = T | ErrorResult

export interface AxiosRequestConfigRetry extends AxiosRequestConfig {
  retryCount?: number;
}