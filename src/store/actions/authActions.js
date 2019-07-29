export const SET_STATUS = "SET_STATUS";
export const SIGNIN_EMAL_PASSWORD = "SIGNIN_EMAL_PASSWORD";
export const SIGNOUT = "SIGNOUT";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILED = "SIGNIN_FAILED";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNOUT_FAILED = "SIGNOUT_FAILED";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function signOut(firebase) {
  return {
    type: SIGNOUT,
    payload: firebase
  };
}

export function signInWithEmailAndPassword(credentials) {
  return {
    type: SIGNIN_EMAL_PASSWORD,
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

export function signOutSuccess(message) {
  return {
    type: SIGNOUT_SUCCESS,
    payload: message
  };
}

export function signOutFailed(message) {
  return {
    type: SIGNOUT_FAILED,
    payload: message
  };
}
