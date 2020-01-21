import {
  SET_SUBCATEGORY_SUCCES,
  SET_STATUS,
  SET_PRODUCT_INFORMATION_SUCCES,
  SET_MULTIMEDIA_SUCCES,
  CREATE_ITEM_SUCCES,
  CREATE_ITEM_ERROR,
  TRANSLATION_SUCCESS
} from "../actions/controlDataItemActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  idUsuario: {},
  subcategory: { categorySelectedId: -1 },
  productInformation: {},
  multimedia: {},
  result: {},
  idDocument: {},
  translation: ""
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
    case CREATE_ITEM_SUCCES: {
      return {
        ...state,
        status: "success",
        result: action.payload
      };
    }
    case CREATE_ITEM_ERROR: {
      return {
        ...state,
        status: "failure",
        message: {
          type: "error",
          text: action.payload
        }
      };
    }
    case TRANSLATION_SUCCESS: {
      return {
        ...state,
        status: "success",
        translation: action.payload
      };
    }
    default:
      return state;
  }
};

export default controlDataItemReducers;
