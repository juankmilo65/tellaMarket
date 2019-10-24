import {
  SELECT_OPTION_MENU,
  setStatus,
  setOptionMenuSuccess
} from "../actions/selectActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function selectEpics(action$) {
  return action$.pipe(
    ofType(SELECT_OPTION_MENU),
    switchMap(action => {
      if (action.type === SELECT_OPTION_MENU) {
        return concat(
          of(setStatus("pending")),
          of(setOptionMenuSuccess(action.payload))
        );
      }
    })
  );
}
