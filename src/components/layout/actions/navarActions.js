export const SET_STATUS = "SET_STATUS";
export const SELECT_LANGUAGE = "SELECT_LANGUAGE";
export const HIDE_HEADER = "HIDE_HEADER";
export const SELECT_LANGUAGE_SUCCESS = "SELECT_LANGUAGE_SUCCESS";
export const HIDE_HEADER_SUCCESS = "HIDE_HEADER_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function setLanguage(language) {
  return {
    type: SELECT_LANGUAGE,
    payload: language
  };
}

export function setLanguageSuccess(newLanguage) {
  return {
    type: SELECT_LANGUAGE_SUCCESS,
    payload: newLanguage
  };
}

export function hideHeader(hide) {
  return {
    type: HIDE_HEADER,
    payload: hide
  };
}

export function hideHeaderSuccess(hide) {
  return {
    type: HIDE_HEADER_SUCCESS,
    payload: hide
  };
}
