export const SET_STATUS = "SET_STATUS";
export const CHANGE_CARD = "CHANGE_CARD";
export const CHANGE_CARD_SUCCESS = "CHANGE_CARD_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function changeCard(idImage) {
  return {
    type: CHANGE_CARD,
    payload: idImage
  };
}

export function changeCardSuccess(newImage) {
  return {
    type: CHANGE_CARD_SUCCESS,
    payload: newImage
  };
}
