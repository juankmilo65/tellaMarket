import {
  setStatus,
  signInSuccess,
  signInFailed,
  SIGNIN_EMAL_PASSWORD
} from "../store/actions/authActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function authEpics(action$, state$) {
  return action$.pipe(
    ofType(SIGNIN_EMAL_PASSWORD),
    switchMap(action => {
      if (action.type === SIGNIN_EMAL_PASSWORD) {
        return concat(
          of(setStatus("pending")),
          action.payload.firebase
            .auth()
            .signInWithEmailAndPassword(
              action.payload.credentials.email,
              action.payload.credentials.password
            )
            .then(() => signInSuccess("Loging Success"))
            .catch(err => signInFailed(err.message))
        );
      }
    })
  );
}
