import {
  SET_STATUS,
  SIGNOUT_FAILED,
  SIGNOUT_SUCCESS
} from "../actions/signoutActions";

const initState = {
  status: "idle", // "idle" |  "pending" | "login" | "success" | "failure";
  messages: []
};

const signoutReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }

    case SIGNOUT_SUCCESS: {
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
    case SIGNOUT_FAILED: {
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

export default signoutReducer;
