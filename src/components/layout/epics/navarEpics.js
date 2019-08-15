import {
  SELECT_LANGUAGE,
  setStatus,
  setLanguageSuccess
} from "../actions/navarActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function createItemEpics(action$) {
  return action$.pipe(
    ofType(SELECT_LANGUAGE),
    switchMap(action => {
      if (action.type === SELECT_LANGUAGE) {
        return concat(
          of(setStatus("pending")),
          of(setLanguageSuccess(action.payload))
        );
      }
    })
  );
}