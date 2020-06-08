import {
  SET_STATUS,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  GET_PRODUCTS_BY_PLAN_ERROR,
  GET_PRODUCTS_BY_PLAN_SUCCESS
} from "../actions/queryResultActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  items: [],
  itemsByPlan: []
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
        ...state,
        items: action.payload
      };
    }
    case GET_PRODUCTS_BY_PLAN_SUCCESS: {
      return {
        ...state,
        itemsByPlan: action.payload
      };
    }
    case GET_PRODUCTS_BY_PLAN_ERROR: {
      return {
        errorMessage: action.payload
      };
    }
    default:
      return state;
  }
};

export default queryResultReducers;
