import { getFirestore } from "redux-firestore";
import {
  CREATE_ITEM,
  setStatus,
  createItemSuccess,
  createItemFailed
} from "../actions/createItemActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function createItemEpics(action$) {
  const getFS = getFirestore();
  return action$.pipe(
    ofType(CREATE_ITEM),
    switchMap(action => {
      if (action.type === CREATE_ITEM) {
        return concat(
          of(setStatus("pending")),
          getFS
            .collection("items")
            .add(action.payload)
            .then(doc => createItemSuccess(doc.id))
            .catch(err => createItemFailed(err))
        );
      }
    })
  );
}
