import {
  SELECT_TAB,
  setStatus,
  selectTabSuccess
} from "../actions/frameActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function frameEpics(action$) {
  return action$.pipe(
    ofType(SELECT_TAB),
    switchMap(action => {
      if (action.type === SELECT_TAB) {
        return concat(
          of(setStatus("pending")),
          of(selectTabSuccess(action.payload))
        );
      }
    })
  );
}
