export const SET_STATUS = "SET_STATUS";
export const CREATE_MENU = "CREATE_MENU";
export const CREATE_MENU_SUCCESS = "CREATE_MENU_SUCCESS";
export const CREATE_MENU_FAILED = "CREATE_MENU_FAILED";
export const EDIT_MENU = "EDIT_MENU";
export const EDIT_MENU_SUCCESS = "EDIT_MENU_SUCCESS";
export const EDIT_MENU_FAILED = "EDIT_MENU_FAILED";
export const GET_SUBCATEGORIES = "GET_SUBCATEGORIES";
export const GET_SUBCATEGORIES_SUCCESS = "GET_SUBCATEGORIES_SUCCESS";
export const GET_SUBCATEGORIES_FAILED = "GET_SUBCATEGORIES_FAILED";
export const GET_CATALOG = "GET_CATALOG";
export const GET_CATALOG_SUCCESS = "GET_CATALOG_SUCCESS";
export const GET_CATALOG_FAILED = "GET_CATALOG_FAILED";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function getCatalog() {
  return {
    type: GET_CATALOG
  };
}

export function getCatalogSuccess(status) {
  return {
    type: GET_CATALOG_SUCCESS,
    payload: status
  };
}

export function getCatalogFailed(message) {
  return {
    type: GET_CATALOG_FAILED,
    payload: message
  };
}

export function getSubcategores() {
  return {
    type: GET_SUBCATEGORIES
  };
}

export function getSubcategoresSuccess(status) {
  return {
    type: GET_SUBCATEGORIES_SUCCESS,
    payload: status
  };
}

export function getSubcategoresFailed(message) {
  return {
    type: GET_SUBCATEGORIES_FAILED,
    payload: message
  };
}

export function createMenu(menu) {
  return {
    type: CREATE_MENU,
    payload: menu
  };
}

export function createMenuSuccess(status) {
  return {
    type: CREATE_MENU_SUCCESS,
    payload: status
  };
}

export function createMenuFailed(message) {
  return {
    type: CREATE_MENU_FAILED,
    payload: message
  };
}

export function editMenuSuccess(status) {
  return {
    type: CREATE_MENU_SUCCESS,
    payload: status
  };
}

export function editMenuFailed(message) {
  return {
    type: CREATE_MENU_FAILED,
    payload: message
  };
}
