import {
  SET_STATUS,
  GET_PREMIUM_HEADER_IMAGES_SUCCESS,
  GET_PREMIUM_HEADER_IMAGES_ERROR,
  GET_PROMO_DASHBOARD_SUCCESS,
  GET_PROMO_DASHBOARD_ERROR
} from "../actions/dashboardActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  imagesPromo: [],
  imagesHeader: [],
  errorMessage: ""
};

const dashboardReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case GET_PROMO_DASHBOARD_SUCCESS: {
      return {
        ...state,
        imagesPromo: action.payload
      };
    }
    case GET_PROMO_DASHBOARD_ERROR: {
      return {
        errorMessage: action.payload
      };
    }
    case GET_PREMIUM_HEADER_IMAGES_SUCCESS: {
      return {
        ...state,
        imagesHeader: action.payload
      };
    }
    case GET_PREMIUM_HEADER_IMAGES_ERROR: {
      return {
        errorMessage: action.payload
      };
    }
    default:
      return state;
  }
};

export default dashboardReducers;
