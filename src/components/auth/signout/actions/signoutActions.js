export const SET_STATUS = "SET_STATUS";
export const SIGNOUT = "SIGNOUT";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function signOut() {
  return {
    type: SIGNOUT
  };
}

export function signOutSuccess(message) {
  return {
    type: SIGNOUT_SUCCESS,
    payload: message
  };
}
