export const SET_STATUS = "SET_STATUS";
export const SET_FILE = "SET_FILE";
export const SET_FILE_SUCCESS = "SET_FILE_SUCCESS";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_ERROR = "UPLOAD_IMAGE_ERROR";
export const UPLOAD_IMAGE_ITEM = "UPLOAD_IMAGE_ITEM";
export const UPLOAD_IMAGE_ITEM_SUCCESS = "UPLOAD_IMAGE_ITEM_SUCCESS";
export const UPLOAD_IMAGE_ITEM_ERROR = "UPLOAD_IMAGE_ITEM_ERROR";

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

export function uploadImage(image) {
  return {
    type: UPLOAD_IMAGE,
    payload: image
  };
}

export function uploadImageSuccess(message) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    payload: message
  };
}

export function uploadImageError(message) {
  return {
    type: UPLOAD_IMAGE_ERROR,
    payload: message
  };
}

export function uploadImageItem(image) {
  return {
    type: UPLOAD_IMAGE_ITEM,
    payload: image
  };
}

export function uploadImageItemSuccess(message) {
  return {
    type: UPLOAD_IMAGE_ITEM_SUCCESS,
    payload: message
  };
}

export function uploadImageItemError(message) {
  return {
    type: UPLOAD_IMAGE_ITEM_ERROR,
    payload: message
  };
}
