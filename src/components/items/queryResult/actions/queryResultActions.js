export const SET_STATUS = "SET_STATUS";
export const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY";
export const GET_PRODUCTS_BY_CATEGORY_SUCCESS =
  "GET_PRODUCTS_BY_CATEGORY_SUCCESS";
export const GET_PRODUCTS_BY_PLAN = "GET_PRODUCTS_BY_PLAN";
export const GET_PRODUCTS_BY_PLAN_SUCCESS = "GET_PRODUCTS_BY_PLAN_SUCCESS";
export const GET_PRODUCTS_BY_PLAN_ERROR = "GET_PRODUCTS_BY_PLAN_ERROR";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function getProductsByPlan(idPlan) {
  return {
    type: GET_PRODUCTS_BY_PLAN,
    payload: idPlan
  };
}
export function getProductsByPlanError(message) {
  return {
    type: GET_PRODUCTS_BY_PLAN_ERROR,
    payload: message
  };
}

export function getProductsByPlanSuccess(itemList) {
  return {
    type: GET_PRODUCTS_BY_PLAN_SUCCESS,
    payload: itemList
  };
}

export function getProductsByCategory(idCategory) {
  return {
    type: GET_PRODUCTS_BY_CATEGORY,
    payload: idCategory
  };
}

export function getProductsByCategorySuccess(itemList) {
  return {
    type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
    payload: itemList
  };
}
