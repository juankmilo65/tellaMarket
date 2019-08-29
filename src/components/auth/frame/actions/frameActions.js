export const SET_STATUS = "SET_STATUS";
export const SELECT_TAB = "SELECT_TAB";
export const SELECT_TAB_SUCCESS = "SELECT_TAB_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function selectTab(isLogin) {
  return {
    type: SELECT_TAB,
    payload: isLogin
  };
}

export function selectTabSuccess(value) {
  return {
    type: SELECT_TAB_SUCCESS,
    payload: value
  };
}
