export const SET_STATUS = "SET_STATUS";
export const SELECT_CATEGORY = "SELECT_CATEGORY";
export const SELECT_CATEGORY_SUCCESS = "SELECT_CATEGORY_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function setOptionCategory(option) {
  return {
    type: SELECT_CATEGORY,
    payload: option
  };
}

export function setOptionCategorySuccess(newOption) {
  return {
    type: SELECT_CATEGORY_SUCCESS,
    payload: newOption
  };
}
