export const SET_STATUS = "SET_STATUS";
export const SIGNOUT = "SIGNOUT";
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
