import {
  SELECT_LANGUAGE_SUCCESS,
  HIDE_HEADER_SUCCESS,
  SET_STATUS
} from "../actions/navarActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  lang: { label: "EN", value: "en" },
  hide: false
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
        hide: action.payload
      };
    }
    default:
      return state;
  }
};

export default navarReducers;
