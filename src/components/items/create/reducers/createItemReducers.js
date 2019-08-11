import {
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_FAILED,
  SET_STATUS
} from "../actions/createItemActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  projects: []
};

const createItemReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case CREATE_ITEM_SUCCESS: {
      return {
        ...state,
        status: "success",
        idItem: action.payload
      };
    }
    case CREATE_ITEM_FAILED: {
      return {
        ...state,
        status: "failure",
        messages: [
          {
            type: "error",
            text: action.payload
          }
        ]
      };
    }
    default:
      return state;
  }
};

export default createItemReducers;
