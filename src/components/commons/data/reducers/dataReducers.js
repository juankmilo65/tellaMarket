import {
  GET_COLLECTIONS_BY_DOCUMENT_FAILED,
  GET_COLLECTIONS_BY_DOCUMENT_SUCCESS,
  GET_DOCUMENTS_EN_SUCCESS,
  GET_DOCUMENTS_ES_SUCCESS,
  GET_DOCUMENTS_PT_SUCCESS,
  GET_DOCUMENTS_FAILED,
  CLEAN_LIST_SUCCESS,
  SET_STATUS
} from "../actions/dataActions";

const initState = {
  status: "idle", // "idle" | "logout" | "pending" | "login" | "success" | "failure";
  documentsEn: [],
  documentsEs: [],
  documentsPt: [],
  collections: []
};

const dataReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload
      };
    }
    case CLEAN_LIST_SUCCESS: {
      return {
        ...state,
        status: "success",
        message: action.payload,
        documentsEn: [],
        documentsEs: [],
        documentsPt: []
      };
    }
    case GET_DOCUMENTS_EN_SUCCESS: {
      return {
        ...state,
        status: "success",
        documentsEn: action.payload
      };
    }
    case GET_DOCUMENTS_ES_SUCCESS: {
      return {
        ...state,
        status: "success",
        documentsEs: action.payload
      };
    }
    case GET_DOCUMENTS_PT_SUCCESS: {
      return {
        ...state,
        status: "success",
        documentsPt: action.payload
      };
    }
    case GET_DOCUMENTS_FAILED: {
      return {
        ...state,
        status: "failure",
        message: {
          type: "error",
          text: action.payload
        }
      };
    }
    case GET_COLLECTIONS_BY_DOCUMENT_SUCCESS: {
      return {
        ...state,
        status: "success",
        catalog: action.payload
      };
    }
    case GET_COLLECTIONS_BY_DOCUMENT_FAILED: {
      return {
        ...state,
        status: "failure",
        message: {
          type: "error",
          text: action.payload
        }
      };
    }
    default:
      return state;
  }
};

export default dataReducers;
