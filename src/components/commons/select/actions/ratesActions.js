export const SET_STATUS = "SET_STATUS";
export const UPDATE_RATES = "UPDATE_RATES";
export const GET_RATES = "GET_RATES";
export const CHANGE_RATE = "CHANGE_RATE";
export const UPDATE_RATE_SUCCESS = "UPDATE_RATE_SUCCESS";
export const CHANGE_RATE_SUCCESS = "CHANGE_RATE_SUCCESS";
export const GET_RATE_SUCCESS = "GET_RATE_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function updateRates() {
  return {
    type: UPDATE_RATES
  };
}

export function getRates() {
  return {
    type: GET_RATES
  };
}

export function changeRate(rate) {
  return {
    type: CHANGE_RATE,
    payload: rate
  };
}

export function updateRatesSuccess() {
  return {
    type: UPDATE_RATE_SUCCESS
  };
}

export function changeRateSuccess(newRate) {
  return {
    type: CHANGE_RATE_SUCCESS,
    payload: newRate
  };
}

export function getRatesSuccess(rates) {
  return {
    type: GET_RATE_SUCCESS,
    payload: rates
  };
}
