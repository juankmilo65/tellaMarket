import {
  SET_SUBCATEGORY_SUCCES,
  SET_STATUS,
  SET_PRODUCT_INFORMATION_SUCCES,
  SET_MULTIMEDIA_SUCCES,
  SET_PLAN_SUCCES,
  CREATE_ITEM_SUCCES,
  CREATE_ITEM_ERROR
} from "../actions/controlDataItemActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  idUsuario: {},
  subcategory: {},
  productInformation: {},
  multimedia: {},
  result: {},
  idDocument: {}
};

const controlDataItemReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case SET_SUBCATEGORY_SUCCES: {
      return {
        ...state,
        status: "success",
        subcategory: action.payload
      };
    }
    case SET_PRODUCT_INFORMATION_SUCCES: {
      return {
        ...state,
        status: "success",
        productInformation: action.payload
      };
    }
    case SET_MULTIMEDIA_SUCCES: {
      return {
        ...state,
        status: "success",
        multimedia: action.payload
      };
    }
    case SET_PLAN_SUCCES: {
      return {
        status: "success",
        result: action.payload
      };
    }
    case CREATE_ITEM_SUCCES: {
      return {
        status: "success",
        idDocument: action.payload
      };
    }
    case CREATE_ITEM_ERROR: {
      return {
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

export default controlDataItemReducers;
