import { SET_FILE_SUCCESS, SET_STATUS } from "../actions/fileUploadActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  files: []
};

const fileUploadReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case SET_FILE_SUCCESS: {
      return {
        ...state,
        status: "success",
        files: action.payload
      };
    }
    default:
      return state;
  }
};

export default fileUploadReducers;
