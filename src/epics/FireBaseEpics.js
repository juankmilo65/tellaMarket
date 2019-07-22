import { getFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";
import {
  CREATE_PROJECT,
  createProject,
  createItemFailed
} from "./../store/actions/projectActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";

export default function firebaseEpic(action$, state$) {
  const getFS = getFirestore();
  const getFB = getFirebase();

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
        return getFS
          .collection("items")
          .add(proj)
          .then(() => {
            createProject(proj);
          });
      }
    })
  );
}
