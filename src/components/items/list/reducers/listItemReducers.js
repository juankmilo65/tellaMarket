import { SET_STATUS, GET_ITEMS } from "../actions/listItemActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  projects: []
};

const listItemReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case GET_ITEMS: {
      return {
        ...state,
        status: "success",
        data: action.payload,
        messages: []
      };
    }
    default:
      return state;
  }
};

export default listItemReducer;
