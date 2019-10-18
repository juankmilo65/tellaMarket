import { SET_STEP_SUCCESS, SET_STATUS } from "../actions/stepsActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  step: 4
};

const stepReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case SET_STEP_SUCCESS: {
      return {
        ...state,
        status: "success",
        step: action.payload
      };
    }

    default:
      return state;
  }
};

export default stepReducers;
