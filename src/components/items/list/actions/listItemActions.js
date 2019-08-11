export const SET_STATUS = "SET_STATUS";
export const GET_ITEMS = "GET_ITEMS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function getItems(items) {
  return {
    type: GET_ITEMS,
    payload: items
  };
}
