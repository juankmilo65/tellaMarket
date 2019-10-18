import {
  SET_SUBCATEGORY_SUCCES,
  SET_STATUS,
  SET_PRODUCT_INFORMATION_SUCCES,
  SET_MULTIMEDIA_SUCCES,
  SET_PLAN_SUCCES,
  CREATE_ITEM_SUCCES
} from "../actions/controlDataItemActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  idUsuario: {},
  subcategory: {},
  productInformation: {},
  multimedia: {},
  plan: {}
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
        ...state,
        status: "success",
        plan: action.payload
      };
    }
    case CREATE_ITEM_SUCCES: {
      return {
        status: "success",
        plan: action.payload
      };
    }
    default:
      return state;
  }
};

export default controlDataItemReducers;
