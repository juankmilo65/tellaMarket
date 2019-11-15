import {
  SELECT_CATEGORY,
  setStatus,
  setOptionCategorySuccess
} from "../actions/categoriesActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function categoriesEpics(action$) {
  return action$.pipe(
    ofType(SELECT_CATEGORY),
    switchMap(action => {
      if (action.type === SELECT_CATEGORY) {
        return concat(
          of(setStatus("pending")),
          of(setOptionCategorySuccess(action.payload))
        );
      }
    })
  );
}
