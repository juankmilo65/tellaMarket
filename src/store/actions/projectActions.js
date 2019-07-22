export const SET_STATUS = "SET_STATUS";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const CREATE_ITEM_FAILED = "CREATE_ITEM_FAILED";

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
