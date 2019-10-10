import {
  setStatus,
  setSubcategorySuccess,
  SET_SUBCATEGORY
} from "../actions/controlDataItemActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function controlDataItemEpics(action$) {
  return action$.pipe(
    ofType(SET_SUBCATEGORY),
    switchMap(action => {
      if (action.type === SET_SUBCATEGORY) {
        return concat(
          of(setStatus("pending")),
          of(setSubcategorySuccess(action.payload)),
          of(setStatus("ok"))
        );
      }
    })
  );
}
