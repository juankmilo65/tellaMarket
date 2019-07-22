import {
  CREATE_PROJECT,
  CREATE_ITEM_FAILED,
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
    case CREATE_PROJECT: {
      console.log("created project", action.payload);
      return {
        ...state,
        status: "success",
        messages: [
          {
            type: "ok",
            text: ["Project Created"]
          }
        ]
      };
    }
    case CREATE_ITEM_FAILED: {
      console.log("created project error", action.payload);
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

export default projectReducer;
