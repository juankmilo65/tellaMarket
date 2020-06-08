import {
  SET_STATUS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SET_NULL_USER_CREATED
} from "../actions/signupActions";

const initState = {
  status: "idle", // "idle" |  "pending" | "login" | "success" | "failure";
  message: "",
  userCreated: null,
  auth: {}
};

const signupReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_NULL_USER_CREATED: {
      return {
        ...state,
        userCreated: null
      };
    }
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
        userCreated: action.payload
      };
    }
    case SIGNUP_FAILED: {
      return {
        ...state,
        status: "failure",
        messages: action.payload
      };
    }
    default:
      return state;
  }
};

export default signupReducer;
