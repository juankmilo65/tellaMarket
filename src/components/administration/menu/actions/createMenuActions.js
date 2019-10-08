export const SET_STATUS = "SET_STATUS";
export const CREATE_MENU = "CREATE_MENU";
export const CREATE_MENU_SUCCESS = "CREATE_MENU_SUCCESS";
export const CREATE_MENU_FAILED = "CREATE_MENU_FAILED";
export const EDIT_MENU = "EDIT_MENU";
export const EDIT_MENU_SUCCESS = "EDIT_MENU_SUCCESS";
export const EDIT_MENU_FAILED = "EDIT_MENU_FAILED";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function createMenu(menu) {
  return {
    type: CREATE_MENU,
    payload: menu
  };
}

export function createMenuSuccess(status) {
  return {
    type: CREATE_MENU_SUCCESS,
    payload: status
  };
}

export function createMenuFailed(message) {
  return {
    type: CREATE_MENU_FAILED,
    payload: message
  };
}

export function editMenuSuccess(status) {
  return {
    type: CREATE_MENU_SUCCESS,
    payload: status
  };
}

export function editMenuFailed(message) {
  return {
    type: CREATE_MENU_FAILED,
    payload: message
  };
}
