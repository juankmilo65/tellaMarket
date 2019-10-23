import {
  SET_STATUS,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS
} from "../actions/queryResultActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  items: []
};

const queryResultReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case GET_PRODUCTS_BY_CATEGORY_SUCCESS: {
      return {
        items: action.payload
      };
    }
    default:
      return state;
  }
};

export default queryResultReducers;
