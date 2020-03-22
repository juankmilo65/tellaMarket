import {
  SET_STATUS,
  PHONE_AUTHENTICATION_SUCCESS,
  PHONE_AUTHENTICATION_FAILED,
  CODE_AUTHENTICATION_SUCCESS,
  CODE_AUTHENTICATION_FAILED
} from "../actions/phoneAuthenticationActions";

const initState = {
  status: "idle", // "idle" |  "pending" | "login" | "success" | "failure";
  message: "",
  confirmResult: null
};

const phoneAuthenticationReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case PHONE_AUTHENTICATION_SUCCESS: {
      return {
        ...state,
        status: "success",
        confirmResult: action.payload,
        messages: [
          {
            type: "ok",
            text: "Phone Authenticated"
          }
        ]
      };
    }
    case PHONE_AUTHENTICATION_FAILED: {
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
    case CODE_AUTHENTICATION_SUCCESS: {
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
    case CODE_AUTHENTICATION_FAILED: {
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

export default phoneAuthenticationReducer;
