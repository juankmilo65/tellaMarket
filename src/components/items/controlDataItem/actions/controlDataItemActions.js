export const SET_STATUS = "SET_STATUS";
export const SET_SUBCATEGORY = "SET_SUBCATEGORY";
export const SET_SUBCATEGORY_SUCCES = "SET_SUBCATEGORY_SUCCES";
export const SET_PRODUCT_INFORMATION = "SET_PRODUCT_INFORMATION";
export const SET_PRODUCT_INFORMATION_SUCCES = "SET_PRODUCT_INFORMATION_SUCCES";
export const SET_MULTIMEDIA = "SET_MULTIMEDIA";
export const SET_MULTIMEDIA_SUCCES = "SET_MULTIMEDIA_SUCCES";
export const SET_PLAN = "SET_PLAN";
export const SET_PLAN_SUCCES = "SET_PLAN_SUCCES";
export const CREATE_ITEM = "CREATE_ITEM";
export const CREATE_ITEM_SUCCES = "CREATE_ITEM_SUCCES";
export const CREATE_ITEM_ERROR = "CREATE_ITEM_ERROR";
export const TRANSLATION = "TRANSLATION";
export const TRANSLATION_SUCCESS = "TRANSLATION_SUCCESS";
export const CLEAN_ITEM_OBJECTS = "CLEAN_ITEM_OBJECTS";
export const CLEAN_ITEM_OBJECTS_SUCCESS = "CLEAN_ITEM_OBJECTS_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}
export function setPlan(plan) {
  return {
    type: SET_PLAN,
    payload: plan
  };
}

export function setPlanSuccess(message) {
  return {
    type: SET_PLAN_SUCCES,
    payload: message
  };
}

export function createItem(item) {
  return {
    type: CREATE_ITEM,
    payload: item
  };
}

export function createItemSuccess(message) {
  return {
    type: CREATE_ITEM_SUCCES,
    payload: message
  };
}

export function createItemError(message) {
  return {
    type: CREATE_ITEM_SUCCES,
    payload: message
  };
}

export function setMultimedia(multimedia) {
  return {
    type: SET_MULTIMEDIA,
    payload: multimedia
  };
}

export function setMultimediaSuccess(message) {
  return {
    type: SET_MULTIMEDIA_SUCCES,
    payload: message
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

export function translation(objTranslate) {
  return {
    type: TRANSLATION,
    payload: objTranslate
  };
}

export function translationSuccess(text) {
  return {
    type: TRANSLATION_SUCCESS,
    payload: text
  };
}

export function cleanItems() {
  return {
    type: CLEAN_ITEM_OBJECTS
  };
}

export function cleanItemsSuccess() {
  return {
    type: CLEAN_ITEM_OBJECTS_SUCCESS
  };
}
