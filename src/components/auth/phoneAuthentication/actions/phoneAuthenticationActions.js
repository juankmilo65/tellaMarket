export const SET_STATUS = "SET_STATUS";
export const PHONE_AUTHENTICATION = "PHONE_AUTHENTICATION";
export const PHONE_AUTHENTICATION_SUCCESS = "PHONE_AUTHENTICATION_SUCCESS";
export const PHONE_AUTHENTICATION_FAILED = "PHONE_AUTHENTICATION_FAILED";
export const CODE_AUTHENTICATION = "CODE_AUTHENTICATION";
export const CODE_AUTHENTICATION_SUCCESS = "CODE_AUTHENTICATION_SUCCESS";
export const CODE_AUTHENTICATION_FAILED = "CODE_AUTHENTICATION_FAILED";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}
export function phoneAuthentication(confg) {
  return {
    type: PHONE_AUTHENTICATION,
    payload: confg
  };
}

export function phoneAuthenticationSuccess(confirmResult) {
  return {
    type: PHONE_AUTHENTICATION_SUCCESS,
    payload: confirmResult
  };
}

export function phoneAuthenticationFailed(message) {
  return {
    type: PHONE_AUTHENTICATION_FAILED,
    payload: message
  };
}

export function codeAuthentication(confg) {
  return {
    type: CODE_AUTHENTICATION,
    payload: confg
  };
}

export function codeAuthenticationSuccess(message, confirmResult) {
  return {
    type: CODE_AUTHENTICATION_SUCCESS,
    confirmResult: confirmResult,
    payload: message
  };
}

export function codeAuthenticationFailed(message) {
  return {
    type: CODE_AUTHENTICATION_FAILED,
    payload: message
  };
}
