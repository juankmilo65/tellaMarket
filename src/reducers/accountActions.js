export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const SET_STATUS = "SET_STATUS";
export const SINGUP = "SINGUP";
export const SINGUP_FAILED = "SINGUP_FAILED";

export function singup() {
  return {
    type: SINGUP
  };
}

export function login(credentials) {
  return {
    type: LOGIN,
    payload: credentials
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function singupFailed(message) {
  return {
    type: SINGUP_FAILED,
    payload: message
  };
}

export function loginFailed(message) {
  return {
    type: LOGIN_FAILED,
    payload: message
  };
}

export function logoutFailed(message) {
  return {
    type: LOGOUT_FAILED,
    payload: message
  };
}

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}
