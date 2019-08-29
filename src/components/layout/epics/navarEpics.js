import {
  SELECT_LANGUAGE,
  HIDE_HEADER,
  setStatus,
  setLanguageSuccess,
  hideHeaderSuccess
} from "../actions/navarActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function createItemEpics(action$) {
  return action$.pipe(
    ofType(SELECT_LANGUAGE, HIDE_HEADER),
    switchMap(action => {
      if (action.type === SELECT_LANGUAGE) {
        return concat(
          of(setStatus("pending")),
          of(setLanguageSuccess(action.payload))
        );
      } else if (action.type === HIDE_HEADER) {
        return concat(
          of(setStatus("pending")),
          of(hideHeaderSuccess(action.payload))
        );
      }
    })
  );
}
