import {
  setStatus,
  signInSuccess,
  signInFailed,
  SIGNIN_EMAIL_PASSWORD,
  SIGNIN_SOCIAL
} from "../actions/signinActions";
import { switchMap, catchError, filter } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
import { apiServices } from "../../../../config/constants";

export default function signinEpics(action$) {
  return action$.pipe(
    ofType(SIGNIN_EMAIL_PASSWORD, SIGNIN_SOCIAL),
    switchMap(action => {
      if (action.type === SIGNIN_EMAIL_PASSWORD) {
        return concat(
          of(setStatus("pending"))
          // action.payload.firebase
          //   .auth()
          //   .signInWithEmailAndPassword(
          //     action.payload.credentials.email,
          //     action.payload.credentials.password
          //   )
          //   .then(() => signInSuccess("Loging Success"))
          //   .catch(err => signInFailed(err.message))
        );
      } else if (action.type === SIGNIN_SOCIAL) {
        return concat(
          of(setStatus("pending")),
          fetch(apiServices + "/singinSocal", {
            mode: "cors",
            method: "POST",
            headers: new Headers({
              Accept: "application/json",
              "Content-Type": "application/json; charset=UTF-8"
            }),
            body: JSON.stringify(action.payload)
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                return signInFailed("Failed");
              }
            })
            .then(data => {
              return signInSuccess(action.payload);
            })

          // of(signInSuccess(action.payload))
        );
      }
    })
  );
}
