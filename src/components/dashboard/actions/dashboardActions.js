export const SET_STATUS = "SET_STATUS";
export const GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM =
  "GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM";
export const GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM_SUCCESS =
  "GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM_SUCCESS";
export const GET_DASHBOARD_PRODUCTS_PLAN_PLUS =
  "GET_DASHBOARD_PRODUCTS_PLAN_PLUS";
export const GET_DASHBOARD_PRODUCTS_PLAN_PLUS_SUCCESS =
  "GET_DASHBOARD_PRODUCTS_PLAN_PLUS_SUCCESS";
export const GET_DASHBOARD_PRODUCTS_PLAN_BASIC =
  "GET_DASHBOARD_PRODUCTS_PLAN_BASIC";
export const GET_DASHBOARD_PRODUCTS_PLAN_BASIC_SUCCESS =
  "GET_DASHBOARD_PRODUCTS_PLAN_BASIC_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function getDashboardProductsPlanPremium(firebase) {
  return {
    type: GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM,
    payload: firebase
  };
}

export function getDashboardProductsPlanPremiumSuccess(itemList) {
  return {
    type: GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM_SUCCESS,
    payload: itemList
  };
}

export function getDashboardProductsPlanPlus(firebase) {
  return {
    type: GET_DASHBOARD_PRODUCTS_PLAN_PLUS,
    payload: firebase
  };
}

export function getDashboardProductsPlanPlusSuccess(itemList) {
  return {
    type: GET_DASHBOARD_PRODUCTS_PLAN_PLUS_SUCCESS,
    payload: itemList
  };
}

export function getDashboardProductsPlanBasic(firebase) {
  return {
    type: GET_DASHBOARD_PRODUCTS_PLAN_BASIC,
    payload: firebase
  };
}

export function getDashboardProductsPlanBasicSuccess(itemList) {
  return {
    type: GET_DASHBOARD_PRODUCTS_PLAN_BASIC_SUCCESS,
    payload: itemList
  };
}
