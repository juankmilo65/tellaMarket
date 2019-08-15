export const SET_STATUS = "SET_STATUS";
export const SIGNIN_EMAIL_PASSWORD = "SIGNIN_EMAIL_PASSWORD";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILED = "SIGNIN_FAILED";
export const SIGNIN_GMAIL = "SIGNIN_GMAIL";
export const SIGNIN_FACEBOOK = "SIGNIN_FACEBOOK";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function signInWithEmailAndPassword(credentials) {
  return {
    type: SIGNIN_EMAIL_PASSWORD,
    payload: credentials
  };
}

export function signInSuccess(message) {
  return {
    type: SIGNIN_SUCCESS,
    payload: message
  };
}

export function signInFailed(message) {
  return {
    type: SIGNIN_FAILED,
    payload: message
  };
}

export function singinGmail(confg) {
  return {
    type: SIGNIN_GMAIL,
    payload: confg
  };
}

export function singinFacebook(confg) {
  return {
    type: SIGNIN_FACEBOOK,
    payload: confg
  };
}
