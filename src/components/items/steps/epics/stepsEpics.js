import { SET_STEP, setStatus, setStepSuccess } from "../actions/stepsActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function stepEpics(action$) {
  return action$.pipe(
    ofType(SET_STEP),
    switchMap(action => {
      if (action.type === SET_STEP) {
        return concat(
          of(setStatus("pending")),
          of(setStepSuccess(action.payload))
        );
      }
    })
  );
}
