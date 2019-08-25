export const SET_STATUS = "SET_STATUS";
export const SET_FILE = "SET_FILE";
export const SET_FILE_SUCCESS = "SET_FILE_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function setFile(files) {
  return {
    type: SET_FILE,
    payload: files
  };
}

export function setFileSuccess(newFile) {
  return {
    type: SET_FILE_SUCCESS,
    payload: newFile
  };
}
