import {
  SINGUP,
  LOGIN,
  LOGOUT,
  LOGIN_FAILED,
  LOGOUT_FAILED,
  SINGUP_FAILED,
  SET_STATUS
} from "./accountActions";

const initialState = {
  data: [],
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  messages: []
};

export function accountReducers(state = initialState, action) {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case LOGIN: {
      return {
        ...state,
        status: "login",
        data: action.payload,
        messages: []
      };
    }
    case LOGOUT: {
      return {
        ...state,
        status: "logout",
        messages: []
      };
    }
    case LOGIN_FAILED: {
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
    case LOGOUT_FAILED: {
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
    case SINGUP: {
      return {
        ...state,
        status: "success",
        messages: [
          {
            type: "ok",
            text: ["User created"]
          }
        ]
      };
    }
    case SINGUP_FAILED: {
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
}
