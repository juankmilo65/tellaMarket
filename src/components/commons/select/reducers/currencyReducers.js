import { SET_CURRENCY, SET_STATUS } from "../actions/currencyActions";
import { Currency } from "../../../../config/currency";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  currency: "USD",
  curencyList: Currency
};

const currencyReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case SET_CURRENCY: {
      return {
        ...state,
        status: "success",
        currency: action.payload
      };
    }
    default:
      return state;
  }
};

export default currencyReducers;
