import { getFirestore } from "redux-firestore";
import {
  GET_DOCUMENTS,
  GET_COLLECTIONS_BY_DOCUMENT,
  setStatus,
  getDocumentsEnSuccess,
  getDocumentsEsSuccess,
  getDocumentsPtSuccess,
  getDocumentsFailed
} from "../actions/dataActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function dataEpics(action$) {
  const getFS = getFirestore();
  return action$.pipe(
    ofType(GET_DOCUMENTS, GET_COLLECTIONS_BY_DOCUMENT),
    switchMap(action => {
      if (action.type === GET_DOCUMENTS) {
        return concat(
          of(setStatus("pending")),
          getFS
            .collection(action.payload.language + "_" + "MachinesAndEquipment")
            .get()
            .then(querySnapshot => {
              let listDocumentIds = [];
              querySnapshot.forEach(doc => {
                listDocumentIds.push(doc.data());
              });

              if (action.payload.language === "pt") {
                return getDocumentsPtSuccess(listDocumentIds);
              } else if (action.payload.language === "es") {
                return getDocumentsEsSuccess(listDocumentIds);
              } else if (action.payload.language === "en") {
                return getDocumentsEnSuccess(listDocumentIds);
              }
            })
            .catch(err => of(getDocumentsFailed(err)))
        );
      }
    })
  );
}
