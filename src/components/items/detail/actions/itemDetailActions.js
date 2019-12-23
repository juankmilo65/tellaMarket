export const SET_STATUS = "SET_STATUS";
export const GET_ITEM = "GET_ITEM";
export const GET_ITEM_SUCCESS = "GET_ITEM_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}
export function getItem(itemId) {
  return {
    type: GET_ITEM,
    payload: itemId
  };
}
export function getItemSuccess(item) {
  return {
    type: GET_ITEM_SUCCESS,
    payload: item
  };
}
