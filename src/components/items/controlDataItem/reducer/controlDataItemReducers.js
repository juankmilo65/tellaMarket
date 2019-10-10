import {
  SET_SUBCATEGORY_SUCCES,
  SET_STATUS
} from "../actions/controlDataItemActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  subcategory: {},
  productInformation: {},
  multimedia: {}
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

    default:
      return state;
  }
};

export default controlDataItemReducers;
