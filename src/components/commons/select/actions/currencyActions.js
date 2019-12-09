export const SET_STATUS = "SET_STATUS";
export const SET_CURRENCY = "SET_CURRENCY";
export const SET_CURRENCY_SUCCESS = "SET_CURRENCY_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function setCurrency(currency) {
  return {
    type: SET_CURRENCY,
    payload: currency
  };
}

export function setCurrencySuccess(newCurrency) {
  return {
    type: SET_CURRENCY_SUCCESS,
    payload: newCurrency
  };
}
