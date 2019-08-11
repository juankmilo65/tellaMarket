import {
  SET_STATUS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED
} from "../actions/signupActions";

const initState = {
  status: "idle", // "idle" |  "pending" | "login" | "success" | "failure";
  messages: []
};

const signupReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }

    case SIGNUP_SUCCESS: {
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
    case SIGNUP_FAILED: {
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

export default signupReducer;
