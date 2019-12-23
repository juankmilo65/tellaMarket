import { SET_STATUS, GET_ITEM_SUCCESS } from "../actions/itemDetailActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  item: null
};

const itemDetailReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case GET_ITEM_SUCCESS: {
      return {
        ...state,
        status: "success",
        item: action.payload
      };
    }
    default:
      return state;
  }
};

export default itemDetailReducers;
