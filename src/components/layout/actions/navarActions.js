export const SET_STATUS = "SET_STATUS";
export const SELECT_LANGUAGE = "SELECT_LANGUAGE";
export const HIDE_HEADER = "HIDE_HEADER";
export const SELECT_LANGUAGE_SUCCESS = "SELECT_LANGUAGE_SUCCESS";
export const HIDE_HEADER_SUCCESS = "HIDE_HEADER_SUCCESS";
export const GET_CURRENT_LOCATION = "GET_CURRENT_LOCATION";
export const GET_CURRENT_LOCATION_SUCCESS = "GET_CURRENT_LOCATION_SUCCESS";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_CATEGORIES_SUCCESS = "SET_CATEGORIES_SUCCESS";

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
export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    payload: categories
  };
}

export function setCategoriesSuccess(newCategories) {
  return {
    type: SET_CATEGORIES_SUCCESS,
    payload: newCategories
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

export function getCurrentLocation() {
  return {
    type: GET_CURRENT_LOCATION
  };
}

export function getCurrentLocationSuccess(country) {
  return {
    type: GET_CURRENT_LOCATION_SUCCESS,
    payload: country
  };
}
