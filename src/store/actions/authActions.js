export const SET_STATUS = "SET_STATUS";
export const SIGNIN_EMAL_PASSWORD = "SIGNIN_EMAL_PASSWORD";
export const SIGNUP_EMAL_PASSWORD = "SIGNUP_EMAL_PASSWORD";
export const SIGNOUT = "SIGNOUT";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILED = "SIGNIN_FAILED";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNOUT_FAILED = "SIGNOUT_FAILED";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

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

export function signUpWithEmailAndPassword(newUser) {
  return {
    type: SIGNUP_EMAL_PASSWORD,
    payload: newUser
  };
}

export function signUpSuccess(message) {
  return {
    type: SIGNUP_SUCCESS,
    payload: message
  };
}

export function signUpFailed(message) {
  return {
    type: SIGNUP_FAILED,
    payload: message
  };
}
