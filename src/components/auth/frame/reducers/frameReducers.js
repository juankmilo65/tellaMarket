import { SELECT_TAB_SUCCESS, SET_STATUS } from "../actions/frameActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  isLogin: true
};

const frameReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case SELECT_TAB_SUCCESS: {
      return {
        ...state,
        status: "success",
        isLogin: action.payload
      };
    }
    default:
      return state;
  }
};

export default frameReducers;
