import { getFirestore } from "redux-firestore";

import {
  CREATE_PROJECT,
  createProjectSuccess,
  setStatus,
  createItemFailed
} from "./../store/actions/projectActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function firebaseEpic(action$, state$) {
  const getFS = getFirestore();

  return action$.pipe(
    ofType(CREATE_PROJECT),
    switchMap(action => {
      if (action.type === CREATE_PROJECT) {
        const proj = {
          ...action.payload,
          ownerLastName: "Juan",
          ownerName: "Morales",
          createAt: new Date()
        };
        return concat(
          of(setStatus("pending")),
          getFS
            .collection("items")
            .add(proj)
            .then(doc => createProjectSuccess(doc.id))
            .catch(err => createItemFailed(err))
        );
      }
    })
  );
}
