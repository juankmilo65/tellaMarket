import {
  catchError,
  debounceTime,
  delay,
  filter,
  map,
  mapTo,
  pluck,
  switchMap,
  withLatestFrom
} from "rxjs/operators";
import {
  SINGUP,
  LOGIN,
  LOGOUT,
  singup,
  singupFailed,
  login,
  logout
} from "../reducers/accountActions";
import { ofType } from "redux-observable";
import { concat, fromEvent, of, merge, race } from "rxjs";
import { handleSignUp } from "../config/Factory";

export function singUpEpic(action$, state$) {
  return action$.pipe(
    ofType(SINGUP, LOGIN, LOGOUT),
    switchMap(action => {
      if (action.type == SINGUP) {
        return concat(of(setStatus("pending")), ({ history }) =>
          handleSignUp.pipe(
            singup(),
            history.push("/"),
            [history],
            catchError(err => {
              return of(singupFailed(err.response.message));
            })
          )
        );
      }
    })
  );
}
