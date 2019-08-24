import { CHANGE_CARD_SUCCESS, SET_STATUS } from "../actions/cardActions";

const initState = {
  status: "idle" // "idle" | "logout" | "pending" | "login" | "success" | "failure";
};

const cardReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case CHANGE_CARD_SUCCESS: {
      return {
        ...state,
        status: "success",
        lang: action.payload
      };
    }
    default:
      return state;
  }
};

export default cardReducers;
