export const SET_STATUS = "SET_STATUS";
export const GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM =
  "GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM";
export const GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM_SUCCESS =
  "GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM_SUCCESS";
export const GET_DASHBOARD_PRODUCTS_PLAN_PLUS =
  "GET_DASHBOARD_PRODUCTS_PLAN_PLUS";
export const GET_DASHBOARD_PRODUCTS_PLAN_BASIC =
  "GET_DASHBOARD_PRODUCTS_PLAN_BASIC";

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

export function getDashboardProductsPlanPlus() {
  return {
    type: GET_DASHBOARD_PRODUCTS_PLAN_PLUS
  };
}

export function getDashboardProductsPlanBasic() {
  return {
    type: GET_DASHBOARD_PRODUCTS_PLAN_BASIC
  };
}
