import { getEnvNode } from '../service';

export interface ApiResponse<T> {
  success: boolean;
  environment: string;
  fromCache: boolean;
  message?: string[];
  data?: T | undefined;
}

export function GetResponseApiTrue(
  message?: string[],
  fromCache: boolean = false,
): ApiResponse<undefined> {
  return GetResponseApi(undefined, message, true, fromCache);
}

export function GetResponseApiFalse(
  message?: string[],
  fromCache: boolean = false,
): ApiResponse<undefined> {
  return GetResponseApi(undefined, message, false, fromCache);
}

export function GetResponseApi<T = undefined>(
  data: T,
  message?: string[],
  success: boolean = true,
  fromCache: boolean = false,
): ApiResponse<T> {
  return {
    success: success,
    message: message,
    fromCache: fromCache,
    environment: getEnvNode(),
    data: data,
  };
}
