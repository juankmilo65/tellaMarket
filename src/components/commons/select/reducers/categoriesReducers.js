import {
  SELECT_CATEGORY_SUCCESS,
  SET_STATUS
} from "../actions/categoriesActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  category: ""
};

const categoriesReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case SELECT_CATEGORY_SUCCESS: {
      return {
        status: "success",
        category: action.payload
      };
    }
    default:
      return state;
  }
};

export default categoriesReducers;
