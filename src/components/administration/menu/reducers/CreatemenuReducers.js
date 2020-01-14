import {
  CREATE_MENU_SUCCESS,
  CREATE_MENU_FAILED,
  EDIT_MENU_SUCCESS,
  EDIT_MENU_FAILED,
  GET_SUBCATEGORIES_SUCCESS,
  GET_SUBCATEGORIES_FAILED,
  GET_CATALOG_SUCCESS,
  GET_CATALOG_FAILED,
  SET_STATUS
} from "../actions/createMenuActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  machine: {},
  subcategories: [],
  catalogs: []
};

const createmenuReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case CREATE_MENU_SUCCESS: {
      return {
        ...state,
        status: "success",
        message: {
          type: "ok",
          text: action.payload
        }
      };
    }

    case CREATE_MENU_FAILED: {
      return {
        ...state,
        status: "failure",
        message: {
          type: "error",
          text: action.payload
        }
      };
    }
    case EDIT_MENU_SUCCESS: {
      return {
        ...state,
        status: "success",
        message: {
          type: "ok",
          text: action.payload
        }
      };
    }

    case EDIT_MENU_FAILED: {
      return {
        ...state,
        status: "failure",
        message: {
          type: "error",
          text: action.payload
        }
      };
    }
    case GET_SUBCATEGORIES_SUCCESS: {
      return {
        ...state,
        status: "success",
        subcategories: action.payload
      };
    }
    case GET_SUBCATEGORIES_FAILED: {
      return {
        ...state,
        status: "failure",
        message: {
          type: "error",
          text: action.payload
        }
      };
    }
    case GET_CATALOG_SUCCESS: {
      return {
        ...state,
        status: "success",
        catalogs: action.payload
      };
    }
    case GET_CATALOG_FAILED: {
      return {
        ...state,
        status: "failure",
        message: {
          type: "error",
          text: action.payload
        }
      };
    }
    default:
      return state;
  }
};

export default createmenuReducers;
