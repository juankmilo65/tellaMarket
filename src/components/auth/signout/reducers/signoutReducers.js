import { SET_STATUS, SIGNOUT_SUCCESS } from "../actions/signoutActions";

const initState = {
  status: "idle", // "idle" |  "pending" | "login" | "success" | "failure";
  message: ""
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
        message: ""
      };
    }

    default:
      return state;
  }
};

export default signoutReducer;
