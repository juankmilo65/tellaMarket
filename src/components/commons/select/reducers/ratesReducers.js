import {
  UPDATE_RATE_SUCCESS,
  SET_STATUS,
  CHANGE_RATE_SUCCESS,
  GET_RATE_SUCCESS
} from "../actions/ratesActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  rates: null
};

const ratesReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case UPDATE_RATE_SUCCESS: {
      return {
        ...state,
        status: "success"
      };
    }
    case CHANGE_RATE_SUCCESS: {
      return {
        ...state,
        status: "success",
        rates: action.payload
      };
    }
    case GET_RATE_SUCCESS: {
      return {
        ...state,
        status: "success",
        rates: action.payload
      };
    }
    default:
      return state;
  }
};

export default ratesReducers;
