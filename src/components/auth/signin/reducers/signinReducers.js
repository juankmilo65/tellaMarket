import {
  SET_STATUS,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED
} from "../actions/signinActions";

const initState = {
  status: "idle", // "idle" |  "pending" | "login" | "success" | "failure";
  messages: []
};

const signinReducer = (state = initState, action) => {
  switch (action.type) {
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
        messages: [
          {
            type: "ok",
            text: action.payload
          }
        ]
      };
    }
    case SIGNIN_FAILED: {
      return {
        ...state,
        status: "failure",
        messages: [
          {
            type: "error",
            text: action.payload
          }
        ]
      };
    }
    default:
      return state;
  }
};

export default signinReducer;