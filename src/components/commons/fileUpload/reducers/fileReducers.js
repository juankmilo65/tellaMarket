import {
  SET_FILE_SUCCESS,
  SET_STATUS,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  UPLOAD_IMAGE_ITEM_SUCCESS,
  UPLOAD_IMAGE_ITEM_ERROR
} from "../actions/fileUploadActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  files: [],
  uploadMesaje: "",
  error: ""
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
    case UPLOAD_IMAGE_SUCCESS: {
      return {
        ...state,
        status: "success",
        uploadMesaje: action.payload
      };
    }
    case UPLOAD_IMAGE_ERROR: {
      return {
        ...state,
        status: "error",
        error: action.payload
      };
    }
    case UPLOAD_IMAGE_ITEM_SUCCESS: {
      return {
        ...state,
        status: "success",
        uploadMesaje: action.payload
      };
    }
    case UPLOAD_IMAGE_ITEM_ERROR: {
      return {
        ...state,
        status: "error",
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default fileUploadReducers;
