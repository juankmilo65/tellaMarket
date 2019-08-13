export const SET_STATUS = "SET_STATUS";
export const SELECT_LANGUAGE = "SELECT_LANGUAGE";
export const SELECT_LANGUAGE_SUCCESS = "SELECT_LANGUAGE_SUCCESS";

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
