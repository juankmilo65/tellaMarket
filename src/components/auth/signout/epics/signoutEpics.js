import { setStatus, signOutSuccess, SIGNOUT } from "../actions/signoutActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function signoutEpics(action$) {
  return action$.pipe(
    ofType(SIGNOUT),
    switchMap(action => {
      if (action.type === SIGNOUT) {
        return concat(
          of(setStatus("pending")),
          of(signOutSuccess("Signout Success"))
        );
      }
    })
  );
}
