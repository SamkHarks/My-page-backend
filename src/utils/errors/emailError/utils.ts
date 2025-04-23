import { EmailErrorCode, emailErrorCodes } from "@/utils/errors/emailError/types.js"


export const isTypeofEmailError = (code: string): code is EmailErrorCode => {
  return emailErrorCodes.includes(code as EmailErrorCode);
}