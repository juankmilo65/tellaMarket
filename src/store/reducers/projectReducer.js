import {
  CREATE_PROJECT_SUCCESS,
  CREATE_ITEM_FAILED,
  GET_ITEMS,
  SET_STATUS
} from "./../actions/projectActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  projects: []
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case CREATE_PROJECT_SUCCESS: {
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
    case GET_ITEMS: {
      return {
        ...state,
        status: "success",
        data: action.payload,
        messages: []
      };
    }
    default:
      return state;
  }
};

export default projectReducer;
