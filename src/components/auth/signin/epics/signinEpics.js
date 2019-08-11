import {
  setStatus,
  signInSuccess,
  signInFailed,
  SIGNIN_EMAIL_PASSWORD
} from "../actions/signinActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function signinEpics(action$) {
  return action$.pipe(
    ofType(SIGNIN_EMAIL_PASSWORD),
    switchMap(action => {
      if (action.type === SIGNIN_EMAIL_PASSWORD) {
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
