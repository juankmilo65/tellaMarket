import {
  SET_STATUS,
  GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM_SUCCESS,
  GET_DASHBOARD_PRODUCTS_PLAN_PLUS,
  GET_DASHBOARD_PRODUCTS_PLAN_BASIC
} from "../actions/dashboardActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  itemsPremium: [],
  itemsPlus: {},
  itemsBasic: {}
};

const dashboardReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case GET_DASHBOARD_PRODUCTS_PLAN_PREMIUM_SUCCESS: {
      return {
        itemsPremium: action.payload
      };
    }
    case GET_DASHBOARD_PRODUCTS_PLAN_PLUS: {
      return {
        itemsPlus: action.payload
      };
    }
    case GET_DASHBOARD_PRODUCTS_PLAN_BASIC: {
      return {
        itemsBasic: action.payload
      };
    }
    default:
      return state;
  }
};

export default dashboardReducers;
