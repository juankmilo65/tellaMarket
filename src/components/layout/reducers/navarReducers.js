import {
  SELECT_LANGUAGE_SUCCESS,
  HIDE_HEADER_SUCCESS,
  GET_CURRENT_LOCATION_SUCCESS,
  SET_STATUS
} from "../actions/navarActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  lang: { label: "EN", value: "en" },
  header: {
    isFomSignin: false,
    hideHeader: false
  },
  country: ""
};

const navarReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case SELECT_LANGUAGE_SUCCESS: {
      return {
        ...state,
        status: "success",
        lang: action.payload
      };
    }
    case HIDE_HEADER_SUCCESS: {
      return {
        ...state,
        status: "success",
        header: action.payload
      };
    }
    case GET_CURRENT_LOCATION_SUCCESS: {
      return {
        ...state,
        country: action.payload
      };
    }
    default:
      return state;
  }
};

export default navarReducers;
