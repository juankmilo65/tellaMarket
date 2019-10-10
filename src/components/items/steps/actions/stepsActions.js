export const SET_STATUS = "SET_STATUS";
export const SET_STEP = "SET_STEP";
export const SET_STEP_SUCCESS = "SET_STEP_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function setStep(step) {
  return {
    type: SET_STEP,
    payload: step
  };
}

export function setStepSuccess(newStep) {
  return {
    type: SET_STEP_SUCCESS,
    payload: newStep
  };
}
