export const SET_STATUS = "SET_STATUS";
export const SIGNUP_EMAIL_PASSWORD = "SIGNUP_EMAIL_PASSWORD";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";
export const SET_NULL_USER_CREATED = "SET_NULL_USER_CREATED";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function signUpWithEmailAndPassword(newUser) {
  return {
    type: SIGNUP_EMAIL_PASSWORD,
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

export function setNullUserCreatedValue() {
  return {
    type: SET_NULL_USER_CREATED,
    payload: null
  };
}
