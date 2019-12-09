import {
  SET_CURRENCY,
  setStatus,
  setCurrencySuccess
} from "../actions/currencyActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function currencyEpics(action$) {
  return action$.pipe(
    ofType(SET_CURRENCY),
    switchMap(action => {
      if (action.type === SET_CURRENCY) {
        return concat(
          of(setStatus("pending")),
          of(setCurrencySuccess(action.payload))
        );
      }
    })
  );
}
