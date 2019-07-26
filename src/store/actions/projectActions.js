export const SET_STATUS = "SET_STATUS";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_ITEM_FAILED = "CREATE_ITEM_FAILED";
export const GET_ITEMS = "GET_ITEMS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function createProject(project) {
  return {
    type: CREATE_PROJECT,
    payload: project
  };
}

export function createItemFailed(message) {
  return {
    type: CREATE_ITEM_FAILED,
    payload: message
  };
}

export function createProjectSuccess(id) {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: id
  };
}

export function getItems(items) {
  return {
    type: GET_ITEMS,
    payload: items
  };
}
