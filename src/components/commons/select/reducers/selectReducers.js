import {
  SELECT_OPTION_MENU_SUCCESS,
  SET_STATUS
} from "../actions/selectActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  option: ""
};

const selectReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case SELECT_OPTION_MENU_SUCCESS: {
      return {
        status: "success",
        option: action.payload
      };
    }
    default:
      return state;
  }
};

export default selectReducers;
