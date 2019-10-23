export const SET_STATUS = "SET_STATUS";
export const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY";
export const GET_PRODUCTS_BY_CATEGORY_SUCCESS =
  "GET_PRODUCTS_BY_CATEGORY_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
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
