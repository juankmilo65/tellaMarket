import {
  CHANGE_CARD,
  setStatus,
  changeCardSuccess
} from "../actions/cardActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function cardEpics(action$) {
  return action$.pipe(
    ofType(CHANGE_CARD),
    switchMap(action => {
      if (action.type === CHANGE_CARD) {
        return concat(
          of(setStatus("pending")),
          of(changeCardSuccess(action.payload))
        );
      }
    })
  );
}
