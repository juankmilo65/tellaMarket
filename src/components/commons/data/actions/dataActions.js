export const SET_STATUS = "SET_STATUS";
export const GET_DOCUMENTS = "GET_DOCUMENTS";
export const GET_DOCUMENTS_PT_SUCCESS = "GET_DOCUMENTS_PT_SUCCESS";
export const GET_DOCUMENTS_ES_SUCCESS = "GET_DOCUMENTS_ES_SUCCESS";
export const GET_DOCUMENTS_EN_SUCCESS = "GET_DOCUMENTS_EN_SUCCESS";
export const GET_DOCUMENTS_SUCCESS = "GET_COLLECTIONS_SUCCESS";
export const GET_DOCUMENTS_FAILED = "GET_COLLECTIONS_FAILED";
export const GET_COLLECTIONS_BY_DOCUMENT = "GET_COLLECTIONS_BY_DOCUMENT";
export const GET_COLLECTIONS_BY_DOCUMENT_SUCCESS =
  "GET_COLLECTIONS_BY_DOCUMENT_SUCCESS";
export const GET_COLLECTIONS_BY_DOCUMENT_FAILED =
  "GET_COLLECTIONS_BY_DOCUMENT_FAILED";
export const CLEAN_LIST = "CLEAN_LIST";
export const CLEAN_LIST_SUCCESS = "CLEAN_LIST_SUCCESS";

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function cleanList(clean) {
  return {
    type: CLEAN_LIST,
    payload: clean
  };
}

export function cleanListSuccess(menssage) {
  return {
    type: CLEAN_LIST_SUCCESS,
    payload: menssage
  };
}

export function getDocuments(data) {
  return {
    type: GET_DOCUMENTS,
    payload: data
  };
}

export function getDocumentsEsSuccess(documents) {
  return {
    type: GET_DOCUMENTS_ES_SUCCESS,
    payload: documents
  };
}

export function getDocumentsEnSuccess(documents) {
  return {
    type: GET_DOCUMENTS_EN_SUCCESS,
    payload: documents
  };
}

export function getDocumentsPtSuccess(documents) {
  return {
    type: GET_DOCUMENTS_PT_SUCCESS,
    payload: documents
  };
}

export function getDocumentsFailed(message) {
  return {
    type: GET_DOCUMENTS_FAILED,
    payload: message
  };
}

export function getCollectionsByDocument(document) {
  return {
    type: GET_COLLECTIONS_BY_DOCUMENT,
    payload: document
  };
}

export function getCollectionsByDocumentSuccess(collections) {
  return {
    type: GET_COLLECTIONS_BY_DOCUMENT_SUCCESS,
    payload: collections
  };
}

export function getCollectionsByDocumentFailed(message) {
  return {
    type: GET_COLLECTIONS_BY_DOCUMENT_FAILED,
    payload: message
  };
}
