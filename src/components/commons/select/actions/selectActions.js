export const SET_STATUS = "SET_STATUS";
export const SELECT_OPTION_MENU = "SELECT_OPTION";
export const SELECT_OPTION_MENU_SUCCESS = "SELECT_OPTION_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function setOptionMenu(option) {
  return {
    type: SELECT_OPTION_MENU,
    payload: option
  };
}

export function setOptionMenuSuccess(newOption) {
  return {
    type: SELECT_OPTION_MENU_SUCCESS,
    payload: newOption
  };
}
