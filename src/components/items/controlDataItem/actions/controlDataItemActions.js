export const SET_STATUS = "SET_STATUS";
export const SET_SUBCATEGORY = "SET_SUBCATEGORY";
export const SET_SUBCATEGORY_SUCCES = "SET_SUBCATEGORY_SUCCES";
export const SET_PRODUCT_INFORMATION = "SET_PRODUCT_INFORMATION";
export const SET_PRODUCT_INFORMATION_SUCCES = "SET_PRODUCT_INFORMATION_SUCCES";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}
export function setProductInformation(productInformation) {
  return {
    type: SET_PRODUCT_INFORMATION,
    payload: productInformation
  };
}

export function setProductInformationSuccess(message) {
  return {
    type: SET_PRODUCT_INFORMATION_SUCCES,
    payload: message
  };
}
export function setSubcategory(subcategory) {
  return {
    type: SET_SUBCATEGORY,
    payload: subcategory
  };
}
export function setSubcategorySuccess(message) {
  return {
    type: SET_SUBCATEGORY_SUCCES,
    payload: message
  };
}
