export const SET_STATUS = "SET_STATUS";
export const SIGNIN_EMAIL_PASSWORD = "SIGNIN_EMAIL_PASSWORD";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILED = "SIGNIN_FAILED";
export const SIGNIN_SOCIAL = "SIGNIN_SOCIAL";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

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

export function signInSuccess(user) {
  return {
    type: SIGNIN_SUCCESS,
    payload: user
  };
}

export function cleanMessage() {
  return {
    type: CLEAR_MESSAGE
  };
}

export function signInFailed(message) {
  return {
    type: SIGNIN_FAILED,
    payload: message
  };
}

export function singinSocial(data) {
  return {
    type: SIGNIN_SOCIAL,
    payload: data
  };
}
