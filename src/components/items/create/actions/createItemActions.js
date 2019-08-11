export const SET_STATUS = "SET_STATUS";
export const CREATE_ITEM = "CREATE_ITEM";
export const CREATE_ITEM_SUCCESS = "CREATE_ITEM_SUCCESS";
export const CREATE_ITEM_FAILED = "CREATE_ITEM_FAILED";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function createItem(item) {
  return {
    type: CREATE_ITEM,
    payload: item
  };
}

export function createItemFailed(message) {
  return {
    type: CREATE_ITEM_FAILED,
    payload: message
  };
}

export function createItemSuccess(id) {
  return {
    type: CREATE_ITEM_SUCCESS,
    payload: id
  };
}
