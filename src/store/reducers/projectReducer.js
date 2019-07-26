import {
  CREATE_PROJECT_SUCCESS,
  CREATE_ITEM_FAILED,
  GET_ITEMS,
  SET_STATUS
} from "./../actions/projectActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  projects: [
    { id: "1", title: "help me find peach", content: "blah blah blah" },
    { id: "2", title: "collect all the stars", content: "blah blah blah" },
    { id: "3", title: "egg hunt with yoshi", content: "blah blah blah" }
  ]
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
