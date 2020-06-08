export const SET_STATUS = "SET_STATUS";
export const GET_PROMO_DASHBOARD = "GET_PROMO_DASHBOARD";
export const GET_PROMO_DASHBOARD_SUCCESS = "GET_PROMO_DASHBOARD_SUCCESS";
export const GET_PROMO_DASHBOARD_ERROR = "GET_PROMO_DASHBOARD_ERROR";
export const GET_PREMIUM_HEADER_IMAGES = "GET_PREMIUM_HEADER_IMAGES";
export const GET_PREMIUM_HEADER_IMAGES_SUCCESS =
  "GET_PREMIUM_HEADER_IMAGES_SUCCESS";
export const GET_PREMIUM_HEADER_IMAGES_ERROR =
  "GET_PREMIUM_HEADER_IMAGES_ERROR";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function getPremiumHeaderImage(tableName) {
  return {
    type: GET_PREMIUM_HEADER_IMAGES,
    payload: tableName
  };
}

export function getPremiumHeaderImageSuccess(images) {
  return {
    type: GET_PREMIUM_HEADER_IMAGES_SUCCESS,
    payload: images
  };
}

export function getPremiumHeaderImageError(error) {
  return {
    type: GET_PREMIUM_HEADER_IMAGES_ERROR,
    payload: error
  };
}

export function getPromoDashboard(tableName) {
  return {
    type: GET_PROMO_DASHBOARD,
    payload: tableName
  };
}

export function getPromoDashboardSuccess(images) {
  return {
    type: GET_PROMO_DASHBOARD_SUCCESS,
    payload: images
  };
}

export function getPromoDashboardErros(error) {
  return {
    type: GET_PROMO_DASHBOARD_ERROR,
    payload: error
  };
}
