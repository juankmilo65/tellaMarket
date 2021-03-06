import {
  SET_STATUS,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  CLEAR_MESSAGE
} from "../actions/signinActions";

const initState = {
  status: "idle", // "idle" |  "pending" | "login" | "success" | "failure";
  auth: {},
  message: ""
};

const signinReducer = (state = initState, action) => {
  switch (action.type) {
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: ""
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        status: "success",
        auth: action.payload
      };
    }
    case SIGNIN_FAILED: {
      return {
        ...state,
        status: "failure",
        auth: null,
        message: action.payload
      };
    }
    default:
      return state;
  }
};

export default signinReducer;
