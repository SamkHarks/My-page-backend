import { EmailErrorCode, statusMap } from "@/services/types.js";


export const getStatusCodeForErrorCode = (code: string): number => {
  const errorCode = isTypeofEmailError(code) ? code : 'EUNKNOWN'
  return statusMap[errorCode];
}


export const isTypeofEmailError = (code: string): code is EmailErrorCode => {
  return code in statusMap;
}