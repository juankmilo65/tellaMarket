import {
  setStatus,
  getItemSuccess,
  GET_ITEM
} from "../actions/itemDetailActions";
import { ofType } from "redux-observable";
import { switchMap } from "rxjs/operators";
import { concat, of } from "rxjs";

export default function itemDetailEpics(action$) {
  return action$.pipe(
    ofType(GET_ITEM),
    switchMap(action => {
      if (action.type === GET_ITEM) {
        return concat(
          of(setStatus("pending"))
          // getFS
          //   .collection("items")
          //   .doc(action.payload)
          //   .get()
          //   .then(doc => {
          //     return getItemSuccess(doc.data());
          //   })
          //   .catch(error => ({
          //     errorCode: error.code,
          //     errorMessage: error.message
          //   }))
        );
      }
    })
  );
}
